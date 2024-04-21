import { respData, respErr } from "@/lib/resp";
import { User } from "@/types/user";
import { Works } from "@/types/works";
import { currentUser } from "@clerk/nextjs";
import { downloadAndUploadImage, generatePresignedUrl } from "@/lib/s3";
import { insertWorks } from "@/models/works";
import { saveUser } from "@/services/user";

import txt2img from "./txt2img.json";
import { genSnowId } from "@/lib/utils";

const MALETTE_API_KEY: string = process.env.MALETTE_API_KEY || ''
const COMFYUI_ENDPOINT: string = process.env.COMFYUI_ENDPOINT || ''
const DEFAULT_ARCADE_PROMPT = ',a design rendering of new building development, elegent office tower with clean facade design in the style of metropolis meets nature, people walking on the steet, some green space and trees, dark gray and light amber for the podium building, day time with realistic sunlight, reflection,rainny,rain, humidity,((masterpiece)), (cyberpunk1.3),high las ((best quality:1.4)),(ultra-high resolution:1.2),(realistic:1.4),(8k:1.2),insanely detailed,'

const requestMaletteResults = async (taskId: string) => {
  const resp = await fetch(`https://malette.art/open/api/v1/workflow/text-arcade/results`, {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      'x-malette-authorization': MALETTE_API_KEY
    },
    "method": "POST",
    "body": JSON.stringify({
      "taskId": taskId
    })
  });

  const data = await resp.json();
  console.log("malette results", data);
  return data;
}

const requestMaletteTxt2Img = async (text: string) => {
  const resp = await fetch("https://malette.art/open/api/v1/workflow/lighting_lora2", {
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      'x-malette-authorization': MALETTE_API_KEY
    },
    "body": JSON.stringify({
      "text6": text + DEFAULT_ARCADE_PROMPT
    }),
    "method": "POST"
  });

  const data = await resp.json();

  const taskId = data.data.publicId;
  let results = await requestMaletteResults(taskId);

  while (results.data.stage !== 'FINISHED') {
    await new Promise(resolve => setTimeout(resolve, 5000));
    results = await requestMaletteResults(taskId);
    console.log("malette results", results);
  }

  return {
    results: results.data.results,
    taskId
  };
}

export async function POST(req: Request) {

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("no auth");
  }

  try {
    const { description } = await req.json();
    if (!description) {
      return respErr("invalid params");
    }

    // save user
    const user_email = user.emailAddresses[0].emailAddress;
    const nickname = user.firstName;
    const avatarUrl = user.imageUrl;
    const userInfo: User = {
      email: user_email,
      nickname: nickname || "",
      avatar_url: avatarUrl,
    };

    await saveUser(userInfo);

    const resp = await requestMaletteTxt2Img(description);

    const { taskId, results } = resp;

    if (!results || results.length === 0) {
      return respErr("no results");
    }

    const worksList: Works[] = [];

    await Promise.all(results.map(async (result: any) => {
      console.log('result: ', result);
      const url = result?.result?.url;
      if (url) {

        const currentDate = new Date();
        const created_at = currentDate.toISOString();
        const img_name = encodeURIComponent(description);
        const s3_img = await downloadAndUploadImage(
          url,
          process.env.AWS_BUCKET || "malette",
          `txt2img/${img_name}.png`
        );
        console.log('s3_img: ', s3_img);
        const works: Works = {
          publicId: genSnowId(),
          remote_taskId: taskId,
          user_id: user_email,
          img_description: description,
          resolution: `512x512`,
          image_url: `txt2img/${img_name}.png`,
          created_at,
          updated_at: created_at,
        };
        await insertWorks(works);
        worksList.push({
          ...works,
          image_url: await generatePresignedUrl(
            process.env.AWS_BUCKET || "malette",
            works.image_url,
            60 * 60 * 24
          )
        });
      }
    }));
    console.log('worksList: ', worksList);

    return respData(worksList);
  } catch (e) {
    console.log("generate works failed: ", e);
    return respErr("generate works failed");
  }
}

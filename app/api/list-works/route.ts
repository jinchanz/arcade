import { respData, respErr } from "@/lib/resp";
import { downloadAndUploadImage, generatePresignedUrl } from "@/lib/s3";
import { genSnowId } from "@/lib/utils";

import { listWorks, updateWorks } from "@/models/works";

const MALETTE_API_KEY: string = process.env.MALETTE_API_KEY || ''
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


export async function POST(req: Request) {
  try {
    const { page } = await req.json();
    const worksList = await listWorks(page || 1, 100);
    if (!worksList) {
      return respData([]);
    }

    await Promise.all(worksList.map(async (works) => {
      if (works.remote_taskId && works.status !== 'FINISHED') {
        const res = await requestMaletteResults(works.remote_taskId);
        const { data } = res;
        if (data.stage === 'FINISHED') {
          works.status = 'FINISHED';
          const { results } = data;
          const url = results?.[0]?.result?.url;
          console.log('results: ', results);
          console.log('url: ', url);
          if (url) {
            const image_name = `txt2img/${genSnowId()}.png`;
            const s3_img = await downloadAndUploadImage(
              url,
              process.env.AWS_BUCKET || "malette",
              image_name
            );
            console.log('s3_img: ', s3_img);
            works.image_url = image_name;
            updateWorks(works);
            works.image_url = await generatePresignedUrl(
              process.env.AWS_BUCKET || "malette",
              works.image_url,
              60 * 60 * 24
            );
          }
        }
      } else {
        console.log(`works ${works.publicId} finished.`);
      }
    }));

    return respData(worksList);
  } catch (e) {
    console.log("get worksList failed: ", e);
    return respErr("get worksList failed");
  }
}

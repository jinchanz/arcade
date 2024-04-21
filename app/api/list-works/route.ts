import { respData, respErr } from "@/lib/resp";

import { listWorks } from "@/models/works";

export async function POST(req: Request) {
  try {
    const { page } = await req.json();
    const worksList = await listWorks(page || 1, 100);

    return respData(worksList);
  } catch (e) {
    console.log("get worksList failed: ", e);
    return respErr("get worksList failed");
  }
}

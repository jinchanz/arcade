
"use client";

import { useContext, useEffect, useState } from "react";

import Input from "@/components/input";
import { Works } from "@/types/works";
import WorksComp from "@/components/works";
import { toast } from "sonner";
import { AppContext } from "@/contexts/AppContext";

export default function () {
  const { user } = useContext(AppContext);
  const [worksList, setWorksList] = useState<Works[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkList = async function (page: number, silent = false) {
    try {
      const uri = "/api/list-works";
      const params = {
        page: page,
        limit: 50,
      };

      setLoading(!silent);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.ok) {
        const res = await resp.json();
        console.log("get wallpapers result: ", res);
        if (res.data) {
          setWorksList(res.data);
          return;
        }
      }

      toast.error("get wallpapers failed");
    } catch (e) {
      console.log("get wallpapers failed: ", e);
      toast.error("get wallpapers failed");
    }
  };

  useEffect(() => {
    fetchWorkList(1);
  }, []);

  useEffect(() => {

    const unfinishedWorks = worksList.filter((work) => work.status !== "FINISHED");
    if (unfinishedWorks.length === 0) {
      return;
    }
    const handle = setTimeout(() => {
      fetchWorkList(1, true);
    }, 2000);

    return () => {
      clearTimeout(handle);
    };

  }, [worksList]);

  return (
    <div className="pt-8 px-8 min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl mx-auto">
        <div className="mx-auto my-4 flex max-w-lg justify-center">
          <Input worksList={worksList} setWorksList={setWorksList} />
        </div>
      </div>

      <div className="pt-0">
        <WorksComp worksList={worksList} loading={loading} />
      </div>
    </div>
  );
}

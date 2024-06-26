"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import { Works } from "@/types/works";
import { toast } from "sonner";
import ListLoading from "../list-loading";

interface Props {
  worksList: Works[] | null;
  loading: boolean;
}

const WorksItem = ({ works }: { works: Works }) => {
  return <div
    key={works?.publicId}
    className="rounded-xl overflow-hidden mb-4 inline-block border border-solid border-[#cdcdcd] md:mb-8 lg:mb-10"
  >
    {
      works?.status !== 'FINISHED' 
        ? <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]"> 
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        : <img
          src={works.image_url}
          alt={works.img_description}
          loading="lazy"
        />
    }

    <div className="px-5 py-8 sm:px-6">
      <p className="flex-col text-[#808080]">
        {works.img_description}
      </p>
      <div className="flex items-center mb-5 mt-6 flex-wrap gap-2 md:mb-6 lg:mb-8">
        <Badge variant="secondary">
          {works.resolution}
        </Badge>

        <div className="flex-1"></div>
        <Avatar>
          <AvatarImage
            src={works.created_user?.avatar_url}
            alt={works.created_user?.nickname}
          />
          <AvatarFallback>
            {works.created_user?.nickname}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a
          href={works.image_url}
          className="flex items-center max-w-full gap-2.5 text-sm font-bold uppercase text-black"
        >
          <p>Download</p>
          <p className="text-sm">
            <FaDownload />
          </p>
        </a>
        <CopyToClipboard
          text={works.img_description}
          onCopy={() => toast.success("Copied")}
        >
          <Button>Copy Prompt</Button>
        </CopyToClipboard>
      </div>
    </div>
  </div>;
}

export default function ({ worksList, loading }: Props) {
  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-0 py-2 md:px-10 md:py-8 lg:py-8">
      {loading ? <ListLoading /> : 
        <div className="flex flex-col items-stretch">
          <div className="gap-x-8 [column-count:1] grid md:grid-cols-3 md:gap-x-4 md:[column-count:3]">
            {
              worksList?.map?.((works: Works) => {
                return <WorksItem works={works} />;
              })
            }
          </div>
        </div> }
      </div>
    </section>
  );
}

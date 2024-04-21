"use client";

import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Works } from "@/types/works";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ListLoading from "../list-loading";

interface Props {
  worksList: Works[];
  setWorksList: Dispatch<SetStateAction<Works[]>>;
}

export default function ({ worksList, setWorksList }: Props) {
  const { user, fetchUserInfo } = useContext(AppContext);

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [works, setWorks] = useState<Works | null>(null);
  const router = useRouter();

  const requestGenWorks = async function () {
    try {
      const uri = "/api/protected/gen";
      const params = {
        description,
      };

      setLoading(true);
      const resp = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(params),
      });
      setLoading(false);

      if (resp.status === 401) {
        toast.error("Please Sign In");
        router.push("/sign-in");
        return;
      }
      console.log("gen works resp", resp);

      if (resp.ok) {
        const { code, message, data } = await resp.json();
        if (code !== 0) {
          toast.error(message);
          return;
        }
        console.log("gen works data", data);
        if (data) {
          fetchUserInfo();

          setDescription("");

          const works: Works = data;
          setWorks(works);
          setWorksList((worksList: Works[]) => [
            works,
            ...worksList,
          ]);

          toast.success("gen works ok");
          return;
        }
      }

      toast.error("gen works failed");
    } catch (e) {
      console.log("search failed: ", e);
      toast.error("gen works failed");
    }
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = function () {
    if (!description) {
      toast.error("invalid image description");
      inputRef.current?.focus();
      return;
    }

    if (!user) {
      toast.error("please sign in");
      return;
    }

    if (user.credits && user.credits.left_credits < 1) {
      toast.error("credits not enough");
      return;
    }

    requestGenWorks();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col w-full gap-10">
      <form
        className="flex w-full flex-col gap-3 sm:flex-row"
        onSubmit={() => {
          return false;
        }}
      >
        <Input
          type="text"
          placeholder="input your prompt"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleInputKeydown}
          disabled={loading}
          ref={inputRef}
        />
        <Button type="button" disabled={loading} onClick={handleSubmit}>
          {loading ? "Generating..." : "Generate"}
        </Button>
      </form>
      {
        loading && <ListLoading />
      }
    </div>
  );
}

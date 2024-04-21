import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { SnowflakeIdv1 } from "simple-flakeid";

export function genSnowId(): string {
  const gen = new SnowflakeIdv1({ workerId: 1 });
  const snowId = gen.NextId();

  return snowId.toString();
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateComponents, } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const { UploadButton, UploadDropzone, Uploader, } =
  generateComponents<OurFileRouter>();

export const { useUploadThing } =
  generateReactHelpers<OurFileRouter>();

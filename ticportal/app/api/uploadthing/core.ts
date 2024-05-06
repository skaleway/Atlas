
import { auth, } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  return { userId: userId }
}

export const ourFileRouter = {
  profilePicture: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  teamProfile: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  projectSubmission: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  /* The `messageAttachment` property in the `ourFileRouter` object is defining an upload configuration
  for handling file uploads of type "image" or "pdf". */
  messageAttachment: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
  


} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
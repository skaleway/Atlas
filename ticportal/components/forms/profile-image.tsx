"use client";
import React, { useState, useRef, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import NextImage from "next/image";
import { User } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProfileImageProps } from "@/types";
import { Slider } from "@/components/ui/slider";
import { cn, useUploadThing } from "@/lib/utils";

const ProfileImage = (props: ProfileImageProps) => {
  const { user } = props;
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const cropperRef = useRef<Cropper>(null);
  const { startUpload } = useUploadThing("profilePicture");

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
        setDone(true);
        setCroppedImage(null);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = useCallback(
    async (_croppedArea: Area, croppedAreaPixels: Area) => {
      try {
        if (cropperRef.current && image) {
          const croppedImageUrl = await getCroppedImage(
            image,
            croppedAreaPixels
          );
          setCroppedImage(croppedImageUrl);
        }
      } catch (error) {
        console.error("Error getting cropped image:", error);
      }
    },
    [image]
  );

  const getCroppedImage = (image: string, croppedAreaPixels: Area) => {
    return new Promise<string>((resolve, reject) => {
      const imageObj = new Image();
      imageObj.src = image;
      imageObj.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = croppedAreaPixels.width;
          canvas.height = croppedAreaPixels.height;

          ctx.drawImage(
            imageObj,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
          );

          resolve(canvas.toDataURL());
        } else {
          reject(new Error("Could not create canvas context."));
        }
      };
      imageObj.onerror = () => {
        reject(new Error("Error loading image."));
      };
    });
  };

  const UpdateUserProfilePicture = async () => {
    // const {} = await currentUser();
    try {
      if (!croppedImage) return toast.error("Image not found");

      const file = await dataURLtoFile(croppedImage, "cropped-image.jpg");
      setIsUploading(true);

      const imgRes = await startUpload(file);

      if (imgRes) {
        const res = await axios.put(`/api/user/${user.userId}`, {
          imageUrl: imgRes[0].url,
        });

        if (res.status === 200) {
          toast.success("Profile Picture updated successfull");
          window.location.reload();
        }
      }
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something happened. Please try again");
    } finally {
      setIsUploading(false);
    }
  };

  const dataURLtoFile = async (
    dataURL: string,
    filename: string
  ): Promise<File[]> => {
    const blob = await fetch(dataURL).then((res) => res.blob());
    const file = new File([blob], filename, { type: "image/jpeg" });
    return [file];
  };
  if (!user) return null;

  return (
    <div className="">
      <div className="flex gap-2 items-center">
        <div className="h-[50px] w-[50px] center border rounded-full cursor-pointer relative center overflow-hidden">
          {user?.imageUrl ? (
            <NextImage
              alt={user?.username!}
              src={user.imageUrl}
              fill
              className="object-cover"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </div>
        <label htmlFor="file">
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
            id="file"
          />
          <p className="flexcol text-xs">
            <span className="font-semibold cursor-pointer">Upload new</span>
            <span>Recommended size: 400x400px</span>
          </p>
        </label>
      </div>
      <Dialog open={done}>
        <DialogContent className="h-1/2 border-none rounded min-w-[40%] flex flex-col p-0 bg-transparent gap-0">
          <div className="p-3 bg-white">
            <p className="font-bold">Edit image</p>
          </div>
          <div className=" min-w-full relative flex-1 bg-black">
            <div className="grid gap-4 py-4 mx-auto w-fit max-w-[50%]">
              <Cropper
                ref={cropperRef}
                image={image!}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={onZoomChange}
                onCropComplete={handleCropComplete}
              />
            </div>
          </div>

          <div className="p-3 bg-white h-fit">
            {/* zoomer */}
            <div className="w-[90%] mx-auto">
              <Slider step={0.1} min={1} max={3} defaultValue={[zoom]} />
            </div>

            {/* done */}
            <div className="mt-5 flex justify-end">
              <button
                className={cn("custom-button", {
                  "cursor-not-allowed opacity-50 disabled:cursor-not-allowed disabled:opacity-50":
                    isUploading,
                })}
                onClick={UpdateUserProfilePicture}
                disabled={isUploading}
              >
                Done
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* )} */}
    </div>
  );
};

export default ProfileImage;

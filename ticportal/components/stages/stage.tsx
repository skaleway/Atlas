"use client";

import { cn } from "@/lib/utils";
import {usePathname, useRouter} from "next/navigation";
import React from "react";

const Stage = ({
  name,
  index,
  type,
  description,
  id,
  isAdmin,
}: {
  name: string;
  index: number;
  isAdmin?: boolean;
  type: "stages" | "home";
  description?: string;
  id?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isCoursePage = pathname.startsWith('/manage');
  return (
    <div
        className={`lg:flex p-3 border rounded gap-2 ${isCoursePage ? "hover:bg-[#e3e3e3]" : ""}` }
        onClick={() => {
            isCoursePage && router.push(`/manage/${id}/courses`)
        }}
    >
      <div
        className={cn(
          "rounded bg-card-foreground border flex items-center justify-center",
          {
            "h-40 min-w-[160px]": type === "stages",
            "h-20 min-w-[80px]": type === "home",
          }
        )}
      >
        <p
          className={cn("text-xl font-bold", {
            "text-base": type === "home",
          })}
        >
          Stage <span>{index}</span>
        </p>
      </div>
      <div className="flex flex-col w-full">
        <div
          className={cn("flex flex-col gap-2", {
            "flex-1": type === "stages",
          })}
        >
          <h1 className="font-semibold text-lg">{name}</h1>
          {type === "stages" && (
            <p className="text-zinc-500 text-sm">{description}</p>
          )}
        </div>

        {type === "home" && <div className="h-3 w-full bg-transparent" />}

          {!isCoursePage && (
              type === "stages" ? (
              <div className="flex w-full justify-end gap-4 mt-3 lg:mt-0">
                  <button
                      className="custom-button"
                      onClick={() => router.push(`/stages/${id}/tutorials`)}
                  >
                      Tutorials
                  </button>
                  <button className="custom-button"
                          onClick={() => router.push(`/stages/${id}/quiz`)}
                  >
                      Quiz
                  </button>
                  {isAdmin && (
  <button className="custom-button" onClick={() => router.push(`/stages/${id}/manage`)}>
    Add Quiz
  </button>
)}
                  <button
                      className={cn("custom-button self-end justify-end", {
                          // "disabled:opacity-50 cursor-not-allowed": index !== 1,
                      })}
                      // disabled={index !== 1}
                      onClick={() => router.push(`/stages/${id}`)}
                  >
                      Unlock
                  </button>
              </div>
          ) : (
              <div className="w-full flex gap-4">
                  <button
                      className={cn("custom-button", {
                          "disabled:opacity-50 cursor-not-allowed": index !== 1,
                      })}
                      disabled={index !== 1}
                  >
                      View
                  </button>
                  <button
                      className={cn(
                          "custom-button bg-transparent border text-background hover:bg-background hover:text-white",
                          {
                              "disabled:opacity-50 cursor-not-allowed": index !== 1,
                          }
                      )}
                      disabled={index !== 1}
                  >
                      Submit
                  </button>
              </div>
          ))
          }
      </div>
    </div>
  );
};

export default Stage;

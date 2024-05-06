import React from "react";;
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import {db} from "@/lib/db";
import CourseTutorial from "@/components/stages/courses-tutorials";

  const Tutorials = async ({ params } : { params: { stageId: string } }) => {
  const user = await currentProfile();
  const stage = await db.stage.findUnique({
    where: {
      id: params.stageId,
    },
    include: {
      Courses: true
    }
  })
  const tutos = stage?.Courses

  if (!user) return redirectToSignIn();
  // return <ClientStage />;
  return tutos?.length === 0 ?
      (
          <div>This Stage has no tutorials</div>
      )
      :
      (
          <div className="flex flex-col gap-y-3">
            <h1 className="font-bold text-3xl sm:mt-0 mb-4">{`Stage ${stage?.stageNumber} Courses`}</h1>
            {
              tutos?.map((tuto) => {
              return <CourseTutorial
                        name={tuto.name}
                        description={tuto.description as string}
                        stageId={stage?.id as string}
                        courseId={tuto.id}
                        key={tuto.id}
              />
            })
            }
          </div>

      )
};

export default Tutorials;

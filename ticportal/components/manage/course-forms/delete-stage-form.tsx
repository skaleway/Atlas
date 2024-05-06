"use client"

import React, {Dispatch, SetStateAction, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Stage} from "@prisma/client";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {useQuery} from "@tanstack/react-query";

const DeleteStageForm = ({ setCollapsedFormName } : {setCollapsedFormName: Dispatch<SetStateAction<string | null>>}) => {

    const [input, setInput] = useState("");
    const [activeStage, setActiveStage] = useState<Stage | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const validationText = `ticportal/stage${activeStage?.stageNumber}`;
    const router = useRouter();

    const getStages = async () => {
        try {
            const response = await fetch("/api/stages");
            return response.json()
        }
        catch (e: any) {
            console.error(e.message)
            return [];
        }
    }

    const {data, status, } = useQuery({
        queryKey: ["stages-delete"],
        queryFn: getStages,
        gcTime: 10000
    })

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsDeleting(true)
        try {
            const response = await fetch(`/api/stages/${activeStage?.id as string}`, { method: 'DELETE' })
            if (response.status !== 200) {
                const errorMessage = await response.text();
                throw new Error(errorMessage)
            }
            else {
                const deletedStage = await response.json()
                toast.success(`Stage ${deletedStage.stageNumber} deleted successfully`)
                router.refresh();
            }
        }
        catch (e: any) {
            console.error(e.message)
            toast.error(e.message)
        }
        finally {
            setIsDeleting(false);
            setActiveStage(null)
            setCollapsedFormName(null);
        }
    }

    return (
        <>
            <Dialog>
                <div className="mb-8">
                    <h1 className="font-semibold text-3xl text-center my-2">Delete Stage Form</h1>
                    <div className="border rounded p-3">
                        {!activeStage && <p className="mb-2">Choose Stage</p>}
                        <div className="flex flex-wrap gap-x-4 gap-y-3 sm:justify-between sm:gap-x-0">
                                {data && data.length !== 0 ? (
                                    data
                                        .sort((stage1: Stage, stage2: Stage) => stage1.stageNumber - stage2.stageNumber)
                                        .map((stage: Stage) => {
                                        return <DialogTrigger key={stage.id} asChild>
                                                    <button
                                                    key={stage.id}
                                                    className={`custom-button px-6 pb-2 pt-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
                                                    onClick={() => setActiveStage(stage)}
                                                    disabled={isDeleting}
                                                    >
                                                        {`Stage ${stage.stageNumber}`}
                                                    </button>
                                                </DialogTrigger>
                                    })
                                ) : (
                                    status === 'pending' ? (
                                            new Array(5).fill(0).map((_, index) => <Skeleton key={index} className="h-[35px] w-[90px] min-w-[80px] center border rounded-full mx-auto" />)
                                        ) :
                                        (
                                            <p className="font-semibold">No Stages</p>
                                        )) }
                        </div>
                    </div>
                </div>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-zinc-900 text-base text-center">
                            Once you delete this stage, there is no going back. Please be
                            certain.
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            type{" "}
                            <span className="font-bold text-red-500 select-none">
                    {validationText}
                  </span>{" "}
                            below
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input
                            className="col-span-3 text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isDeleting}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleDelete}
                            className={cn(
                                "bg-red-100 rounded text-red-900 flex-1 hover:bg-red-500 hover:text-white",
                                {
                                    "cursor-not-allowed opacity-50 select-none":
                                        input !== validationText || isDeleting,
                                }
                            )}
                            disabled={input !== validationText || isDeleting}
                        >
                            Delete Stage
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    );
};

export default DeleteStageForm;

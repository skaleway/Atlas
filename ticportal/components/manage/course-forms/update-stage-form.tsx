"use client"

import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {Stage} from "@prisma/client";
import {Skeleton} from "@/components/ui/skeleton";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

interface inputsTypes {
    name?: string,
    description?: string,
    stageNumber?: number
}

const UpdateStageForm = ({ setCollapsedFormName } : {setCollapsedFormName: Dispatch<SetStateAction<string | null>>}) => {
    const [inputs, setInputs] = useState<inputsTypes>({});
    const [activeStage, setActiveStage] = useState<Stage | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter();

    const getStages = async () => {
        try {
            const response = await axios.get("/api/stages");
            return response.data
        }
        catch (e: any) {
            console.error(e.message);
            throw e;
        }
    }

    const { data, isLoading} = useQuery({
        queryKey: ["stages-update"],
        queryFn: getStages,
        gcTime: 10000,
        refetchInterval: false
    });

    console.log(data)

    const handleOnChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
        const {name, value} = event.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsSubmitting(true)
        try {
            const body : any = {};
            if (inputs.description !== activeStage?.name) body['name'] = inputs.name
            if (inputs.description !== activeStage?.description) body['description'] = inputs.description
            const response = await fetch(`/api/stages/${activeStage?.id as string}`, {
                method: 'PUT',
                body: JSON.stringify({ ...body })
            })
            if (response.status !== 200) {
                const errorMessage = await response.text();
                throw new Error(errorMessage)
            }
            else {
                const updatedStage = await response.json()
                console.log(updatedStage);
                toast.success(`Stage ${updatedStage.stageNumber} updated successfully`)
                router.refresh();
            }
        }
        catch (e: any) {
            console.error(e.message)
            toast.error(e.message)
        }
        finally {
            setIsSubmitting(false);
            setCollapsedFormName(null);
        }
    }

    return (
        <div className="mb-8">
            <h1 className="font-semibold text-3xl text-center my-2">Update Stage Form</h1>
            <div className="border rounded p-3">
                {!activeStage && <p className="mb-2">Choose Stage</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-3 sm:justify-between sm:gap-x-0">
                    {data && data.length !== 0 ? (
                        data
                            .sort((stage1: Stage, stage2: Stage) => stage1.stageNumber - stage2.stageNumber)
                            .map((stage: Stage) => {
                            return <button
                                key={stage.id}
                                    className={`custom-button px-6 pb-2 pt-2.5 rounded-full hover:bg-[#e5e5e5] hover:text-black border-2 border-black ${activeStage === stage && "border-black bg-white text-black border-2"} disabled:opacity-50 disabled:cursor-not-allowed`}
                                onClick={() => {
                                    setInputs({name: stage.name, description: stage.description})
                                    if (activeStage && activeStage === stage)
                                        setActiveStage(null)
                                    else
                                        setActiveStage(stage)
                                }}
                                disabled={isSubmitting}
                            >
                                {`Stage ${stage.stageNumber}`}
                            </button>
                        })
                    ) : (
                        isLoading ? (
                            new Array(5).fill(0).map((_, index) => <Skeleton key={index} className="h-[35px] w-[90px] min-w-[80px] center border rounded-full mx-auto" />)
                        ) :
                        (
                        <p className="font-semibold">No Stages</p>
                    )) }
                </div>
                {activeStage && <form>
                    <div className="flex flex-col sm:mb-0 mb-3 mt-4">
                        <label htmlFor="name">Stage Name</label>
                        <input
                            name="name"
                            className="pl-3 w-[270px] h-[45px] pb-2 pt-2.5 text-gray-700 bg-white border focus:outline-none focus:border-blue-600 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Enter stage name"
                            value={inputs.name}
                            disabled={isSubmitting}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col w-full mt-3">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            className="pl-3 w-full h-[125px] pb-2 pt-2.5 text-gray-700 bg-white border focus:outline-none focus:border-blue-600 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Enter stage description"
                            value={inputs.description}
                            disabled={isSubmitting}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="custom-button rounded px-6 pb-2 mt-3 pt-2.5 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleOnSubmit}
                            type="submit"
                            // disabled={true}
                            disabled={Object.keys(inputs).length !== 2 || Object.values(inputs).includes("") || isSubmitting}
                        >
                            Update Stage
                        </button>
                    </div>
                </form>}
            </div>
        </div>
    );
};

export default UpdateStageForm;

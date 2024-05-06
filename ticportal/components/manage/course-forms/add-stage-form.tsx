"use client"

import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { toast } from "sonner";
import {Stage} from "@prisma/client";

interface inputsTypes {
    name?: string,
    description?: string,
    stageNumber?: number | string
}

const AddStageForm = ({ setCollapsedFormName } : {setCollapsedFormName: Dispatch<SetStateAction<string | null>>}) => {

    const [inputs, setInputs] = useState<inputsTypes>({});
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [stages, setStages] = useState([])
    const router = useRouter();

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const response = await fetch("/api/stages");
                return await response.json()
            }
            catch (e: any) {
                console.error(e.message)
                return [];
            }
        }

        fetchStages().then(setStages);
    }, []);

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
            const body = {...inputs}
            body.stageNumber = parseInt(inputs.stageNumber as string)

            // Making sure that the stage number does not exist already
            if (stages.length > 0) {
                const stagesNumbers = stages.map((stage: Stage) => (stage.stageNumber))
                if (stagesNumbers.includes(body.stageNumber)){
                    setInputs(prevState => ({...prevState, stageNumber: ""}))
                    throw new Error(`A stage with Stage Number ${inputs.stageNumber} exists already`)
                }
            }

            const response = await fetch(`/api/stages/`, {
                method: 'POST',
                body: JSON.stringify({ ...body })
            })
            if (response.status !== 200) {
                const errorMessage = await response.text();
                throw new Error(errorMessage)
            }
            else {
                const createdStage = await response.json()
                console.log(createdStage);
                toast.success(`Stage ${createdStage.stageNumber} created successfully`)
                setCollapsedFormName(null)
                router.refresh();
            }
        }
        catch (e: any) {
            console.error(e.message)
            toast.error(e.message)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="mb-8">
            <h1 className="font-semibold text-3xl text-center my-2">Add Stage Form</h1>
            <form>
                <div className="flex justify-between flex-wrap mt-4">
                    <div className="flex flex-col sm:mb-0 mb-3">
                        <label htmlFor="stageNumber">Stage Number</label>
                        <input
                            name="stageNumber"
                            className="pl-3 w-[270px] h-[45px] pb-2 pt-2.5 text-gray-700 bg-white border focus:outline-none focus:border-blue-600 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                            type="number"
                            value={inputs.stageNumber}
                            placeholder="Enter Stage Number"
                            disabled={isSubmitting}
                            onChange={handleOnChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col sm:mb-0 mb-3">
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
                        disabled={Object.keys(inputs).length !== 3 || Object.values(inputs).includes("") || isSubmitting}
                    >
                        Add Stage
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStageForm;

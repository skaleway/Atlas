"use client"
import AddStageForm from "@/components/manage/course-forms/add-stage-form";
import UpdateStageForm from "@/components/manage/course-forms/update-stage-form";
import DeleteStageForm from "@/components/manage/course-forms/delete-stage-form";
import {useState} from "react";

const StageForms = () => {
    const [collapsedFormName, setCollapsedFormName] = useState<string | null>(null)

    return (
        <>
            <div className="flex gap-x-4 mb-8">
                {
                    collapsedFormName === "Add" ? (
                        <button
                            className="custom-button px-6 pb-2 pt-2.5 text-white"
                            onClick={() => {
                                setCollapsedFormName(null)
                            } }
                        >
                            Close
                        </button>
                    ) :
                    (
                        <button
                            className="text-white custom-button px-6 pb-2 pt-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => {
                                setCollapsedFormName("Add")
                            } }
                            disabled={collapsedFormName !== null}
                        >
                            Add Stage
                        </button>
                    )
                }
                {
                    collapsedFormName === "Update" ? (
                            <button
                                className="custom-button px-6 pb-2 pt-2.5 text-white"
                                onClick={() => {
                                    setCollapsedFormName(null)
                                } }
                                // disabled={!isCollapsed}
                            >
                                Close
                            </button>
                        ) :
                        (
                            <button
                                className="text-white custom-button px-6 pb-2 pt-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => {
                                    setCollapsedFormName("Update")
                                } }
                                disabled={collapsedFormName !== null}
                            >
                                Update Stage
                            </button>
                        )
                }
                {
                    collapsedFormName === "Delete" ? (
                            <button
                                className="custom-button px-6 pb-2 pt-2.5 text-white"
                                onClick={() => {
                                    setCollapsedFormName(null)
                                } }
                                // disabled={!isCollapsed}
                            >
                                Close
                            </button>
                        ) :
                        (
                            <button
                                className="text-white custom-button px-6 pb-2 pt-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => {
                                    setCollapsedFormName("Delete")
                                } }
                                disabled={collapsedFormName !== null}
                            >
                                Delete Stage
                            </button>
                        )
                }
            </div>
            {collapsedFormName === "Add" && <AddStageForm setCollapsedFormName={setCollapsedFormName} />}
            {collapsedFormName === "Update" && <UpdateStageForm setCollapsedFormName={setCollapsedFormName}/>}
            {collapsedFormName === "Delete" && <DeleteStageForm setCollapsedFormName={setCollapsedFormName}/>}
        </>
    );
};

export default StageForms;

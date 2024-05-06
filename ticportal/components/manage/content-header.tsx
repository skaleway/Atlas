"use client"

import { useRouter } from "next/navigation";

const ContentHeader = ({ stageId } : { stageId : string }) => {
    const router = useRouter()
    const sortOptions = ["Sort By", "Item 1", "Item 2", "Item 3"]

    return (
        <div className='flex justify-between'>
            <button
                style={{height: 45}}
                className="px-6 pb-2 pt-2.5 text-white custom-button text-lg"
                onClick={() => router.push(`/manage/${stageId}/courses/new`)}
            >
                Add Course
            </button>
                <div>
                    <select name="sort_by" id="sort" className="flex flex-row justify-between w-fit px-6 pb-2 pt-2.5 text-gray-700 bg-white border rounded-[8px] focus:outline-none focus:border-blue-600">
                        {sortOptions.map((option, index) => {
                            return <option
                                        className="w-48 py-2 mt-2 bg-white rounded-[8px] shadow-xl absolute p-2"
                                        value={option}
                                        key={index}
                            >
                                {option}
                            </option>
                        })}
                    </select>
            </div>
        </div>
    );
};

export default ContentHeader;

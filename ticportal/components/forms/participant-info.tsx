import React from "react";
import { User } from "@prisma/client";
import { QrCode } from "lucide-react";
import * as z from "zod";

import LineText from "@/components/shared/linetext";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { participantsInfo } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";

interface RegionInfo {
  region: string;
  capital: string;
}

type fieldName =
  | "gardianName"
  | "gardianPhone"
  | "location"
  | "schoolName"
  | "classLevel"
  | "region";

const ParticipantInfo = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof participantsInfo>>({
    defaultValues: {
      gardianName: user.gardianName!,
      gardianPhone: user.gardianPhone!,
      location: user.location!,
      schoolName: user.schoolName!,
      classLevel: user.classLevel!,
      region: user.region!,
    },
  });

  const {
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdateParticipantInfo = async (
    values: z.infer<typeof participantsInfo>
  ) => {
    if (!user) return toast.error("Unauthorized");

    if (errors.location) {
      return toast.error("Check your fields values");
    }

    try {
      const res = await axios.put(`/api/user/${user.userId}`, values);
      if (res.status === 200) {
        toast.success("Profile updated successfull");
        // return window.location.reload();
      }
    } catch (error: any) {
      if (error.response?.data) return toast.error(error.response?.data);
      return toast.error("Something went wrong.");
    }
  };

  const cameroonRegionsWithCapitals: RegionInfo[] = [
    { region: "Adamaoua", capital: "Ngaoundéré" },
    { region: "Centre", capital: "Yaoundé" },
    { region: "East (Est)", capital: "Bertoua" },
    { region: "Far North (Extrême-Nord)", capital: "Maroua" },
    { region: "Littoral", capital: "Douala" },
    { region: "North (Nord)", capital: "Garoua" },
    { region: "Northwest (Nord-Ouest)", capital: "Bamenda" },
    { region: "South (Sud)", capital: "Ebolowa" },
    { region: "Southwest (Sud-Ouest)", capital: "Buea" },
    { region: "West (Ouest)", capital: "Bafoussam" },
  ];

  const strings = [
    [
      {
        name: "gardianName",
        question: "Gardian name",
        placeholder: user.gardianName
          ? user.gardianName
          : "Enter the name of the person you're living with",
      },
      {
        name: "gardianPhone",
        question: "Gardian phone",
        placeholder: user.gardianName
          ? user.gardianName
          : "Enter the phone number of the person you're living with",
      },
    ],
    [
      {
        name: "schoolName",
        question: "School name",
        placeholder: user.schoolName
          ? user.schoolName
          : "Enteryour school name",
      },
      {
        name: "classLevel",
        question: "Class level",
        placeholder: user.classLevel
          ? user.classLevel
          : "In which class are you in?",
      },
    ],
    [
      {
        name: "location",
        question: "Location",
        placeholder: user.location
          ? user.location
          : "Where are you currently located",
      },
      {
        name: "region",
        question: "Region",
      },
    ],
  ];

  return (
    <div className="mt-8">
      <LineText>
        <p className="flex items-center justify-center gap-2">
          <QrCode className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">Participant Info</span>
        </p>
      </LineText>
      <p className="text-xs">You can&apos;t change any information here yet!</p>
      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateParticipantInfo)}>
            <div className="w-full flexcol gap-4">
              {strings.map((string, index) => (
                <div
                  className="flex lg:flex-row flex-col gap-3 w-full "
                  key={index}
                >
                  {string.map(({ name, question, placeholder }, index) => {
                    //some code here

                    return (
                      <FormField
                        control={form.control}
                        key={index}
                        name={name as fieldName}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <section className="flexcol">
                              <FormLabel className={cn("text-xs", {})}>
                                {question}{" "}
                                <span className="text-rose-500">*</span>
                              </FormLabel>
                              {name === "region" ? (
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value as fieldName}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a region" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {cameroonRegionsWithCapitals.map(
                                      (region) => {
                                        //some code here

                                        return (
                                          <SelectItem
                                            key={region.region}
                                            value={region.capital}
                                          >
                                            {region.region}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <FormControl>
                                  <input
                                    placeholder={placeholder}
                                    className={cn(
                                      "w-full custom-input custom-input-parent py-2 text-sm my-1",
                                      {
                                        "border-rose-500": errors.location,
                                        "opacity-50 cursor-not-allowed":
                                          isSubmitting,
                                      }
                                    )}
                                    disabled={isSubmitting}
                                    {...field}
                                  />
                                </FormControl>
                              )}
                            </section>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <section className="w-full justify-end flex mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn("custom-button", {
                  "opacity-50 cursor-not-allowed": isSubmitting,
                })}
              >
                Update
              </button>
            </section>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ParticipantInfo;

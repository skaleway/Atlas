"use client";

import React from "react";
import { UserPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LineText from "../shared/linetext";
import { allowMessagesFrom } from "@/constants";

const FormSchema = z.object({
  type: z.enum(["everyone", "peers", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const AllowMessagesFrom = () => {
  const allowTypes = allowMessagesFrom();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "everyone",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="w-full">
      <LineText>
        <p className="flex items-center justify-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">
            allow message from
          </span>
        </p>
      </LineText>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {allowTypes.map((type) => {
                      return (
                        <FormItem
                          className="space-x-3 space-y-0 flex justify-between"
                          key={type.name}
                        >
                          <FormLabel className="font-normal flexcol gap-2 cursor-pointer">
                            <p className="text-sm font-semibold">{type.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {type.desc}
                            </p>
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem value={type.type} type="submit" />
                          </FormControl>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default AllowMessagesFrom;

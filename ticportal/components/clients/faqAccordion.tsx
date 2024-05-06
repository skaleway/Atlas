"use client";

import React from "react";

import { faqs } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Questions = () => {
  const frequentyAskedQuestions = faqs();
  return (
    <div className="flex w-full">
      <Accordion
        type="single"
        collapsible
        className="flexcol gap-3 w-full flex slowmo"
      >
        {frequentyAskedQuestions.map((q, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={q.question}
            className="w-full slowmo"
          >
            <AccordionTrigger className="text-start">
              {q.question}
            </AccordionTrigger>
            <AccordionContent>{q.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Questions;

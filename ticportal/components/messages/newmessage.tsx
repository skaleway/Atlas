"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCirclePlus } from "lucide-react";

const NewMessages = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="custom-button flex items-center gap-2 rounded-full">
          <MessageCirclePlus className="w-4 h-4" /> New Message
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-white z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            Connect with your team members or others.
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            className="col-span-3 text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search people..."
            // disabled={isDeleting}
            // onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="primary">Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessages;

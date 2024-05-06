"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateForm from "@/components/forms/create-team";
import SearchForm from "@/components/forms/search-form";
import { User } from "@prisma/client";

const InitialModal = ({ user }: { user: User }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open>
      <DialogContent className="bg-white rounded text-background overflow-hidden p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create or find your team
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your team personality with a name and an Image. You can always
            change it later.
          </DialogDescription>
        </DialogHeader>

        <CreateForm user={user} />

        <SearchForm />
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;

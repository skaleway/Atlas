"use client";

import { User } from "@prisma/client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "../ui/button";
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
import { cn } from "@/lib/utils";
import LineText from "../shared/linetext";
import { AlertTriangle } from "lucide-react";

const DangerZone = ({ userData }: { userData: User }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [username, setUsername] = useState("");

  const validationText = `ticportal/${userData.username}`;

  const handleSignOut = () => {
    signOut(() => router.push("/sign-in"));
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      if (username !== validationText)
        return toast.error("Invalid credentials");

      const { data } = await axios.delete("/api/private", {
        data: { userId: userData.userId },
      });

      if (data.message === "Success") {
        toast.success("Account deleted");
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-full w-full">
      <LineText>
        <p className="flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">Danger Zone</span>
        </p>
      </LineText>
      <Dialog>
        <div className="flexcol gap-3">
          <p className="text-xs">
            Delete your account and account data. This can’t be undone!
          </p>
          <div className="flex-between gap-3">
            <DialogTrigger asChild>
              <Button className="bg-red-100 rounded text-red-600 flex-1 hover:bg-red-500 hover:text-white">
                Delete account
              </Button>
            </DialogTrigger>
            <Button
              className="rounded  flex-1 bg-foreground"
              variant="ghost"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>

        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-zinc-900 text-base text-center">
              Once you delete your account, there is no going back. Please be
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleDelete}
              className={cn(
                "bg-red-100 rounded text-red-900 flex-1 hover:bg-red-500 hover:text-white",
                {
                  "cursor-not-allowed opacity-50 select-none":
                    username !== validationText || isDeleting,
                }
              )}
              disabled={username !== validationText || isDeleting}
            >
              Delete Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DangerZone;

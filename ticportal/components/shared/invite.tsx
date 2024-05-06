"use client";

import { cn } from "@/lib/utils";
import { Copy, Send, Share2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type InviteType = "link" | "email" | "dm";

const Invite = ({
  inviteType,
  username,
  displayName,
}: {
  inviteType: InviteType;
  username?: string;
  displayName?: string;
}) => {
  const inviteLink = `https://ticportal.vercel.app/${username}/signup`;
  const [inviteEmails, setInviteEmails] = useState("");

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${displayName} has invited you join TiC summit portal`,
          url: `If you haven’t already joined the @TiC Summit community, you can join here ${inviteLink}. It’s a great place to start working with your team on your pr and your problem solving skills.`,
          //   text: inviteLink,
        })

        .then(() => console.log("Successful share"))
        .catch((error: Error) => console.error("Error sharing:", error));
    } else {
      console.log("Web Share API not supported in this browser.");
    }
  };

  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard");
      return true;
    } catch (error) {
      toast.error("Error copying to clipboard");
      return false;
    }
  }

  const dmText = `Hey, have you heard of Tic Summit? 

        It’s a great place to start working with your team on your pr and your problem solving skills. It's the biggest secondary school hackathon orgranise for students at this stage of education . I think you’d really enjoy it! Here’s the link to check it out: ${inviteLink}. 

       Let me know if you decide to join, I’d love to connect with you there!`;

  const handleSendInvite = async () => {
    ///some code there
    const emails = inviteEmails.split(",");

    console.log(emails);
  };

  if (inviteType === "link")
    return (
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="invite_left">
          <h2>Invite via {inviteType}</h2>
          <p>
            Invite your friends and colleagues to join TiC Summit using your
            unique link.
          </p>
        </div>
        <div className="flex-[1.5] w-full flexcol gap-2">
          <p
            onClick={() => copyToClipboard(inviteLink)}
            className="p-3 text-sm border slowmo h-fit rounded-full hover:shadow cursor-pointer "
          >
            {inviteLink}
          </p>
          <button
            className="center h-8 w-8 border rounded-full"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  if (inviteType === "email")
    return (
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="invite_left">
          <h2>Invite via {inviteType}</h2>
          <p>
            We&apos;ll send one-time invitation email on behalf of you to the
            invitee.
          </p>
        </div>
        <div className="flex-[1.5] w-full h-full">
          <div className="w-full  custom-input-parent py-1 input_textarea gap-1">
            <p className="text-xs opacity-90">Invite email(s)</p>
            <textarea
              className="custom-input h-full text-sm resize-none w-full flex"
              placeholder="example@gmail.com, contact@ticsummit.org"
              onChange={(e) => setInviteEmails(e.target.value)}
            />
          </div>
          <div className="w-full  justify-end flex mt-2">
            <button
              type="submit"
              className={cn(
                "custom-button bg-transparent text-background rounded-full border flex-center gap-2 hover:text-white"
              )}
              onClick={handleSendInvite}
            >
              <Send className="w-3 h-3" />
              Send Invite
            </button>
          </div>
        </div>
      </div>
    );
  if (inviteType === "dm")
    return (
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="invite_left">
          <h2>Send them a {inviteType}</h2>
          <p>
            Copy this message if you want to DM them on WhatsApp, Slack, etc.
          </p>
        </div>
        <div className="flex-[1.5] w-full h-full">
          <div className="w-full  custom-input-parent py-1 input_textarea gap-1">
            <textarea
              className="custom-input h-full text-sm resize-none w-full flex"
              placeholder="example@gmail.com, contact@ticsummit.org"
              value={dmText}
            />
          </div>
          <div className="w-full  justify-end flex mt-2">
            <button
              type="submit"
              className={cn(
                "custom-button bg-transparent text-background rounded-full border flex-center gap-2 hover:text-white"
              )}
              onClick={() => copyToClipboard(inviteLink)}
            >
              <Copy className="w-3 h-3" />
              Copy
            </button>
          </div>
        </div>
      </div>
    );
};

export default Invite;

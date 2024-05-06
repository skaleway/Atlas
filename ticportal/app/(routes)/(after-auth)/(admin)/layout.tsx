import ControlHeader from "@/components/admin/control-header";
import { currentProfile } from "@/lib/current-profile";
import Link from "next/link";
// import {} from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentProfile();

  if (user?.role !== "ADMIN")
    return (
      <div className="h-full w-full children center">
        <div className="border w-[90%] gap-4 rounded p-10 center flex-col">
          <p className="text-center ">
            You don&apos;t have access to this page. You can contact the Mentors
            or Admins to change your status.
          </p>
          <Link href="/" className="custom-button">
            Go back home
          </Link>
        </div>
      </div>
    );

  return (
    <main>
      <ControlHeader />
      <div className="mt-4">{children}</div>
    </main>
  );
};

export default AdminLayout;

import { HoverCardContent } from "@/components/ui/hover-card";
import Profile from "./profile";
import { User } from "@prisma/client";
import { formatDate, useFallbackText } from "@/constants/indexfxns";

export function ProfileCard({ user }: { user: User }) {
  const fallBackText = useFallbackText(user);
  const date = formatDate(user.createdAt);

  return (
    <HoverCardContent className="w-[400px]">
      <div className="flex justify-between space-x-4">
        <div className="h-8 min-w-[32px] center border rounded-full cursor-pointer relative overflow-hidden">
          <Profile
            imageUrl={user.imageUrl ? user.imageUrl : ""}
            fallBackText={fallBackText}
          />
        </div>
        <div className="space-y-1 w-full">
          <h4 className="text-sm">
            username: <span className="font-semibold">{user.username}</span>
          </h4>
          <p className="text-sm">
            firstname: {user.firstName ? user.firstName : "No user firstName"}
          </p>
          <p className="text-sm">
            lastName: {user.lastName ? user.lastName : "No user lastname"}
          </p>
          <p className="text-sm">
            description:{" "}
            {user.description ? user.description : "No user description"}
          </p>
          <p className="text-sm">
            email: {user.email ? user.email : "No user email"}
          </p>
          <p className="text-sm">
            gardianName:{" "}
            {user.gardianName ? user.gardianName : "No user gardianName"}
          </p>
          <p className="text-sm">
            gardianPhone:{" "}
            {user.gardianPhone ? user.gardianPhone : "No user gardianPhone"}
          </p>
          <p className="text-sm">
            location: {user.location ? user.location : "No user location"}
          </p>
          <p className="text-sm">
            schoolName:{" "}
            {user.schoolName ? user.schoolName : "No user schoolName"}
          </p>
          <p className="text-sm">
            paymentStatus:{" "}
            <span className="font-semibold">{`${user.paid}`}</span>
          </p>

          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">Joined {date}</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
}

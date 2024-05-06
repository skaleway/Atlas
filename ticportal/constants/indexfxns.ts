import {User} from "@prisma/client";
import axios from "axios";
import { currentUser } from "@clerk/nextjs";
import {AnalyticsData, StudentData} from "@/types";

export const getUser = async () => {
  try {
    const { data } = await axios.get("/api/user");

    if (data) return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export function getGreeting(): string {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

export function useUsername(user: User): string {
  if (!user) return "";
  const username =
    user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
      : user.username?.split("-admin").join("");
  return username || "";
}

export function useUserId(user: User): string {
  if (!user) return "";

  const userId = user.userId;

  return userId || "";
}

export function userEmail(user: User): string {
  if (!user) return "";

  const useremail = user.email;

  return useremail || "";
}

export function useFallbackText(user: User): string {
  const usernameDisplay = useUsername(user);

  let fallBackText: string = "";

  const Letter1 = usernameDisplay?.split(" ")[0]?.split("")[0];
  const Letter2 = usernameDisplay?.split(" ")[1]?.split("")[0];

  if (Letter2 !== undefined) return (fallBackText = `${Letter1}${Letter2}`);

  return (fallBackText = `${Letter1}`);
}

export function getStartAndEndOfWeek(currentDate: Date): {
  startDate: Date;
  endDate: Date;
} {
  const today = currentDate;
  const dayOfWeek = today.getDay();
  const startDate = new Date(today);
  const endDate = new Date(today);

  startDate.setDate(today.getDate() - dayOfWeek);
  endDate.setDate(today.getDate() + (6 - dayOfWeek));

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}

export function getStartAndEndOfWeekBefore(date: Date): {
  startDate: Date;
  endDate: Date;
} {
  const startDate = new Date(date);
  const endDate = new Date(date);

  const dayOfWeek = date.getDay() + 1; // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) and the + 1 is for it to use Sunday as the reference of the starting point of the week not monday

  // Calculate the difference in days to go back to the start of the week (Sunday)
  const daysToSubtract = (dayOfWeek + 6) % 7;

  startDate.setDate(date.getDate() - (daysToSubtract + 7)); // Subtract days to get the start of the previous week
  endDate.setDate(date.getDate() - (daysToSubtract + 1)); // Subtract days to get the end of the previous week

  return { startDate, endDate };
}

export const getData = async () => {
  try {


    const response = await axios.get("/api/user/analytics");
    return response.data as AnalyticsData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await axios.get("/api/user/students");
    return response.data as StudentData[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTeam = async () => {
  try {
    const response = await axios.get("/api/teams");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


export const getCoordinators = async () => {
  try {
    const response = await axios.get("/api/user/coordinators");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/*fixed build issues*/

export const isTeamAdmin = async (teamId: string,) => {
  try {
    const user1 = await axios.get(`/api/user/`);
    const { data } = await axios.get(`/api/teams/members/${teamId}/`);
    console.log(data,user1.data.id)
    let isAdmin = false;
    for (let i = 0; i < data.length; i++) { 
      if (data[i].id === user1.data.id && data[i].role === 'ADMIN') {
        isAdmin = true;
        console.log(isAdmin) 
        break;
      }
    }
    return isAdmin;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export const getTeamData = async (teamId: string) => {
  try {
    const response = await axios.get(`/api/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export function formatDate(dateString: Date, includeTime?: boolean): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: includeTime ? "numeric" : undefined,
    minute: includeTime ? "2-digit" : undefined
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

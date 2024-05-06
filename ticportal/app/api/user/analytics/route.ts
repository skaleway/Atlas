import {
  getStartAndEndOfWeek,
  getStartAndEndOfWeekBefore,
} from "@/constants/indexfxns";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { startDate, endDate } = getStartAndEndOfWeek(new Date());
    const { startDate: weekBeforeStartDate, endDate: weekBeforeEndDate } =
      getStartAndEndOfWeekBefore(new Date());
    const userAccounts = await db.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
        role: "PARTICIPANT",
      },
    });

    const usersAccountsOfLastWeek = await db.user.findMany({
      where: {
        createdAt: {
          gte: weekBeforeStartDate,
          lt: weekBeforeEndDate,
        },
        role: "PARTICIPANT",
      },
    });

    const weeklyAnalytics = await db.user.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
        role: "PARTICIPANT",
      },
    });

    const weekBeforeWeekAnaltics = await db.user.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: {
          gte: weekBeforeStartDate,
          lt: weekBeforeEndDate,
        },
        role: "PARTICIPANT",
      },
    });

    const students = await db.user.findMany({
      where: {
        role: "PARTICIPANT",
      },
    });

    const teams = await db.team.findMany();
    const coordinators = await db.user.findMany({
      where: {
        OR: [
          {
            role: "ADMIN",
          },
          {
            role: "MENTOR",
          },
          {
            role: "JUDGE",
          },
        ],
      },
    });

    return NextResponse.json({
      currentWeek: {
        user: {
          message: "User Analytics",
          users: userAccounts,
        },
        weekly: {
          message: "Week Analytics",
          accounts: weeklyAnalytics,
        },
      },
      weekBefore: {
        user: {
          message: "Users of last week",
          users: usersAccountsOfLastWeek,
        },
        weekly: {
          message: "accounts of last week",
          accounts: weekBeforeWeekAnaltics,
        },
      },
      totalStudents: students.length,
      totolTeams: teams.length,
      totalCoordinators: coordinators.length,
    });
  } catch (error) {
    console.log("Internal server error");
  }
}

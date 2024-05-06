import * as z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(4, { message: "username must be at least 10 characters." }),
  email: z.string().email({ message: "email must be at least 10 characters." }),
  password: z
    .string()
    .min(6, { message: "password must be at least 10 characters." }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "email must be at least 10 characters." }),
  password: z
    .string()
    .min(6, { message: "password must be at least 10 characters." }),
});

export const contactSchema = z.object({
  username: z
    .string()
    .min(4, { message: "username must be at least 10 characters." }),
  email: z
    .string()
    .email({ message: "provide a valid email address" })
    .min(5, { message: "must be at 5 least  characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .email({ message: "provide a valid email address" })
    .min(5, { message: "must be at 5 least  characters." }),
  newEmail: z
    .string()
    .email({ message: "provide a valid email address" })
    .min(5, { message: "must be at 5 least  characters." }),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Message must be at least 8 characters." }),
  confirm: z
    .string()
    .min(8, { message: "Message must be at least 8 characters." }),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Message must be at least 8 characters." }),
});

export const initialModalSchema = z.object({
  name: z.string().min(1, { message: "Team name is required." }),
  imageUrl: z.string().min(1, {
    message: "Team image require.",
  }),
});

export const initialModalSearchTeam = z.object({
  name: z.string().min(1, { message: "Team name is required." }),
});

export const basicUserSchema = z.object({
  firstName: z.string().min(4, { message: "First name is required." }),
  lastName: z.string().min(4, { message: "Last name is required." }),
  description: z.string().min(50, { message: "Description is required." }),
});

export const contactInfos = z.object({
  email: z.string().min(4, { message: "First name is required." }),
  phone: z.string().min(4, { message: "Last name is required." }),
  secondaryEmail: z.string().min(50, { message: "Description is required." }),
});

export const participantsInfo = z.object({
  gardianName: z.string().min(4, { message: "Gardians  name is required." }),
  gardianPhone: z
    .string()
    .min(4, { message: "Gardians phone number is required." }),
  location: z.string().min(4, { message: "location is required." }),
  schoolName: z.string().min(4, { message: "School name is required." }),
  classLevel: z.string().min(4, { message: "Class level is required." }),
  region: z.string().min(4, { message: "Region is required." }),
  somethingDone: z.string().min(50, { message: "Essay too short." }),
  problemSolving: z.string().min(50, { message: "Essay too short." }),
  proposeSolution: z.string().min(50, { message: "Essay too short." }),
  whyYouAttending: z.string().min(50, { message: "Essay too short." }),
  teamInfo: z.string().min(10, { message: "too short." }),
  howYoulearnAboutUs: z.string().min(10, { message: "too short." }),
  age: z.number().min(1, { message: "Age required." }),
});

export const participantsInsights = z.object({
  somethingDone: z.string().min(50, { message: "Essay too short." }),
  whyYouAttending: z.string().min(50, { message: "Essay too short." }),
  howYoulearnAboutUs: z.string().min(10, { message: "too short." }),
  age: z.number().min(1, { message: "Age required." }),
});

export const teamInfo = z.object({
  problemState: z
    .string()
    .min(4, { message: "Problem Statement is required." }),
  proposeSolution: z
    .string()
    .min(4, { message: "Proposed solution is required." }),
});

import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z.intersection(
  z.object({
    name: z.string().min(2, { message: "Required" }),
    email: z
      .string()
      .min(2, { message: "Email is required" })
      .refine((input) => patterns.email.test(input), {
        message: "Email not valid",
      }),
    states: z
      .array(z.string())
      .min(1)
      .max(2, { message: "Pick 2 states at most" }),
    languagesSpoken: z.array(z.string()),
    gender: z.string().min(1),
    skills: z.array(z.string()).max(2, { message: "Pick 2 skills at most" }),
    registrationDateAndTime: z.date(),
    formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
    salaryRange: z.array(z.number()).min(2).max(2),
    isTeacher: z.boolean(),
  }),
  z
    .discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
    .and(
      z.union([
        z.object({ isTeacher: z.literal(false) }),
        z.object({
          isTeacher: z.literal(true),
          students: z.array(
            z.object({
              name: z.string().min(4),
            })
          ),
        }),
      ])
    )
);

export type Schema = z.infer<typeof schema>;

// Recommended this instead option.value?.map at line 29
export const defaultValues: Schema = {
  variant: "create",
  email: "",
  name: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 50],
  isTeacher: false,
};

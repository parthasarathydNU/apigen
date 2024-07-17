import z from 'zod';

export const StatusOptions = ["Active", "Inactive", "Pending"];
export const UserRoleOptions = ["User", "Manager", "Admin"];
const Role = z.enum(["User", "Manager", "Admin"]);
const Status = z.enum(["Active", "Inactive", "Pending"]);

export const userSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(5, { message: "Must be 5 or more characters long" }),
    email: z.string().email(),
    role: Role,
    status: Status,
    // added in Zod 3.23
    signUpDate: z.string().date(), // ISO date format (YYYY-MM-DD)
    lastLogin: z.string().date()
  });

export const userArraySchema = z.array(userSchema);
  
export type User = z.infer<typeof userSchema>
export type UserPartial = z.infer<typeof userSchema>

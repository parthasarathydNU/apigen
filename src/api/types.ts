import z from 'zod';

const Role = z.enum(["User", "Manager", "Admin"]);
const Status = z.enum(["Active", "Inactive", "Pending"]);

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    role: Role,
    status: Status,
    // added in Zod 3.23
    signUpDate: z.string().date(), // ISO date format (YYYY-MM-DD)
    lastLogin: z.string().date()
  });

export const userArraySchema = z.array(userSchema);
  
export type User = z.infer<typeof userSchema>

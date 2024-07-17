import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

import { cn } from "../lib/utils";
import { StatusOptions, User, UserRoleOptions } from "src/api/types";
import { UseFormReturn } from "react-hook-form";

interface EditRowFormProps {
  onSubmit: (values: User) => void;
  form: UseFormReturn<User>;
  user: User;
}

const EditRowForm: React.FC<EditRowFormProps> = ({ onSubmit, form, user }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="User Name" {...field} />
              </FormControl>
              <FormDescription>
                This is the public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* EMAIL */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email id" {...field} />
              </FormControl>
              <FormDescription>This will be the userId.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ROLE */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className=" w-[60%] sm:w-[75%] max-w-[55vw]">
                    <SelectValue placeholder={user.role} />
                  </SelectTrigger>
                  <SelectContent>
                    {UserRoleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>This will be the userId.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* STATUS */}

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className=" w-[60%] sm:w-[75%] max-w-[55vw]">
                    <SelectValue placeholder={user.status} />
                  </SelectTrigger>
                  <SelectContent>
                    {StatusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>This will be the userId.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sign Up Date */}

        <FormField
          control={form.control}
          name="signUpDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Sign Up Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        field.value
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(ch) => field.onChange(format(ch ? ch : new Date(), "PPP"))}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Login Date */}

        <FormField
          control={form.control}
          name="lastLogin"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Login Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        field.value
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(ch) => field.onChange(format(ch ? ch : new Date(), "PPP"))}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    
                  />
                </PopoverContent>
              </Popover>
              {/* <FormDescription>
              Your date of birth is used to calculate your age.
            </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditRowForm;

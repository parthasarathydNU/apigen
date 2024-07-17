import React, { ChangeEvent, useContext, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Edit } from "lucide-react";
import { StatusOptions, User, UserRoleOptions } from "src/api/types";
import { UserActionTypes } from "src/state/userReducer";
import { UserTableDispatchContext } from "./UserTableContext";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface EditRowDialogProps {
  user: User;
}

const EditRowDialog: React.FC<EditRowDialogProps> = ({ user }) => {
  const dispatch = useContext(UserTableDispatchContext);

  const [updatedUser, setUpdatedUser] = useState(user);

  const handleUserDetailsChanged = (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newUser = {
      ...updatedUser,
      [key]: e.target.value,
    };

    setUpdatedUser(newUser);
  };

  const handleOptionsChanged = (newOption: string, field: string) => {
    const newUser = {
      ...updatedUser,
      [field]: newOption,
    };

    setUpdatedUser(newUser);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Edit size={"20"} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit User</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center justify-end">
              <Label htmlFor="name" className=" text-right ">
                Name
              </Label>
              <Input
                className="w-[75%] max-w-[55vw]"
                value={updatedUser.name}
                onChange={(e) => handleUserDetailsChanged(e, "name")}
              />
            </div>
            <div className="flex gap-3 items-center justify-end">
              <Label htmlFor="email" className=" text-right ">
                Email
              </Label>
              <Input
                className="w-[75%] max-w-[55vw]"
                value={updatedUser.email}
                onChange={(e) => handleUserDetailsChanged(e, "email")}
              />
            </div>
            <div className="flex gap-3 items-center justify-end">
              <Label htmlFor="role" className=" text-right ">
                Role
              </Label>

              <Select
                onValueChange={(newRole) =>
                  handleOptionsChanged(newRole, "role")
                }
              >
                <SelectTrigger className="w-[75%] max-w-[55vw]">
                  <SelectValue placeholder={updatedUser.role} />
                </SelectTrigger>
                <SelectContent>
                  {UserRoleOptions.map((role) => (
                    <SelectItem value={role} >{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 items-center justify-end">
              <Label htmlFor="status" className=" text-right ">
                Status
              </Label>
              <Select
                onValueChange={(newStatus) =>
                  handleOptionsChanged(newStatus, "status")
                }
              >
                <SelectTrigger className="w-[75%] max-w-[55vw]">
                  <SelectValue placeholder={updatedUser.status} />
                </SelectTrigger>
                <SelectContent>
                  {StatusOptions.map((status) => (
                    <SelectItem value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 items-center justify-end">
              <Label htmlFor="signUpDate" className=" text-right ">
                Sign Up Date
              </Label>
              <Input
                type={"date"}
                className="w-[75%] max-w-[55vw]"
                value={updatedUser.signUpDate}
                onChange={(e) => handleUserDetailsChanged(e, "signUpDate")}
              />
            </div>
            <div className="flex gap-3 items-center justify-end">
              <Label htmlFor="lastLogin" className=" text-right ">
                Last Login
              </Label>
              <Input
                type={"date"}
                className="w-[75%] max-w-[55vw]"
                value={updatedUser.lastLogin}
                onChange={(e) => handleUserDetailsChanged(e, "lastLogin")}
              />
            </div>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              dispatch({
                type: UserActionTypes.CHANGED,
                payload: updatedUser,
              });
            }}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditRowDialog;

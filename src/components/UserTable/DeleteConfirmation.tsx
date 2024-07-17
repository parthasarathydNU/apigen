import React, { useContext } from "react";

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

import { Trash } from "lucide-react";
import { User } from "src/api/types";
import { UserActionTypes } from "src/state/userReducer";
import { UserTableDispatchContext } from "./UserTableContext";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

interface DeleteConfirmationProps {
  user: User;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ user }) => {
  const dispatch = useContext(UserTableDispatchContext);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <Button variant={"ghost"} size={"sm"}>
          {" "}
          <Trash size={"20"} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast(`User ${user.name} Deleted`, {
                description: `Deleted now ${format(new Date(), "p")}`,
              });
              dispatch({
                type: UserActionTypes.DELETED,
                payload: user,
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;

import React, { useContext } from 'react'

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
import { UserTableDispatchContext } from './UserTableContext';

interface DeleteConfirmationProps {
    user : User
}

const DeleteConfirmation : React.FC<DeleteConfirmationProps> = ({user})  => {

    const dispatch = useContext(UserTableDispatchContext);

  return (
    <AlertDialog>
      <AlertDialogTrigger><Trash size={"20"}  /></AlertDialogTrigger>
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
          <AlertDialogAction onClick={() => {
            dispatch({
                type:UserActionTypes.DELETED,
                payload: user
            })
          }}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConfirmation;

"use client";

import { Row } from "@tanstack/react-table";

import { Button } from "../ui/button";

import { userSchema } from "src/api/types";
import DeleteConfirmation from "./DeleteConfirmation";
import { Edit } from "lucide-react";
import EditRowDialog from "./EditRowDialog";

interface UserTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function UserTableRowActions<TData>({
  row,
}: UserTableRowActionsProps<TData>) {

  const user = userSchema.parse(row.original);


  return (
    <div className="flex">
      <Button variant={"ghost"} size="sm">
        
        <EditRowDialog user={user}/>
      </Button>
      <Button variant={"ghost"} size="sm">
        <DeleteConfirmation user={user} />
      </Button>
    </div>
  );
}

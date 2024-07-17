"use client";

import { Row } from "@tanstack/react-table";


import { userSchema } from "src/api/types";
import DeleteConfirmation from "./DeleteConfirmation";
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

        
        <EditRowDialog user={user}/>


        <DeleteConfirmation user={user} />

    </div>
  );
}

import React, { useReducer } from "react";
import { DataTable } from "../ui/data-table/DataTable";
import { UserTableColumns } from "./UserTableColumns";
import {
  initialUserState,
  userReducer,
} from "src/state/userReducer";
import { UserTableContext, UserTableDispatchContext } from "./UserTableContext";

interface UserTableProps {}

const UserTable: React.FC<UserTableProps> = () => {
  const [userData, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <div className="max-w-screen w-[90vw]">
      <UserTableContext.Provider value={userData}>
        <UserTableDispatchContext.Provider value={dispatch}>
          <DataTable columns={UserTableColumns} data={userData} />
        </UserTableDispatchContext.Provider>
      </UserTableContext.Provider>
    </div>
  );
};

export default UserTable;

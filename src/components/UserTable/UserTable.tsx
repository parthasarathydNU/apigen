import { getUserData } from "src/api/hooks";
import { User, userArraySchema } from "src/api/types";

import React, { useEffect, useReducer } from "react";
import { DataTable } from "../DataTable";
import { UserTableColumns } from "./UserTableColumns";
import { initialUserState, UserActionTypes, userReducer } from "src/state/userReducer";

interface UserTableProps {}

const UserTable: React.FC<UserTableProps> = () => {

  const [userData, dispatch] = useReducer(userReducer, initialUserState);
  
  /**
   * Ideal situation - use data hooks to use react-query to cache and
   * invalidate data fetches
   */
  // const {data, isLoading, error} = useUserData();

  // Run this side effect after initial render
  useEffect(() => {
    let ignore = false;

    dispatch({
      type: UserActionTypes.CLEAR_USERS,
      payload: undefined
    })

    const fetchData = async () => {
      const data = getUserData();

      // validate data
      const {
        data: userData,
        error,
        success,
      } = userArraySchema.safeParse(data);

      if (error) {
        console.log("Error in fetching user data ", error);
      }

      if (success && userData) {
        if (!ignore) {
          console.log("Setting user data");
          
          userData.forEach(user => {
            dispatch({
              type: UserActionTypes.ADDED,
              payload: user
            })
          })
        }
      }
    };

    fetchData();

    return () => {
      console.log("Ignoring data fetch");
      ignore = true;
    };
  }, []);

  return (
    <div className="max-w-screen w-[80vw]">
      <DataTable columns={UserTableColumns} data={userData} />
    </div>
  );
};

export default UserTable;

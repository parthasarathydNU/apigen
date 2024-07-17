import { User } from "src/api/types";
import userData from "../api/sample_data.json";

export const i = 10;

export const initialUserState: User[] = userData as User[];

export enum UserActionTypes {
  ADDED,
  CHANGED,
  DELETED,
  CLEAR_USERS,
}

type UserAction = {
  type: UserActionTypes;
  payload: Partial<User> | undefined;
};

export function userReducer(users: any, action: UserAction) {
  switch (action.type) {
    case UserActionTypes.CLEAR_USERS: {
      return [];
    }
    case UserActionTypes.ADDED: {
      console.log("user addded");
      const newUser = action.payload;
      return [...users, newUser];
    }
    case UserActionTypes.CHANGED: {
      console.log("user changed");

      return users.map((u: User) => {
        if (u.id === action.payload?.id) {
          return action.payload;
        } else {
          return u;
        }
      });
    }
    case UserActionTypes.DELETED: {
      console.log("user deleted");
      const newUsers = users.filter((u: User) => u.id !== action.payload?.id);
      console.log(newUsers);

      return newUsers;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

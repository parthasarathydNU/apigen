import { User } from "src/api/types";

export const i = 10;

export const initialUserState : User[] = [];

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
        return []
    }
    case UserActionTypes.ADDED: {
      const newUser = action.payload;
      return [...users, newUser];
    }
    case UserActionTypes.CHANGED: {
      return users.map((u:User) => {
        if (u.id === action.payload?.id) {
          return action.payload;
        } else {
          return u;
        }
      });
    }
    case UserActionTypes.DELETED: {
      return users.filter((u:User) => u.id !== action.payload?.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

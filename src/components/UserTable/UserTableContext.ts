import { createContext, Dispatch } from 'react';

export const UserTableContext = createContext(null);
export const UserTableDispatchContext = createContext(null as unknown as Dispatch<any>);

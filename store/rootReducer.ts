import { combineReducers } from "@reduxjs/toolkit"; 
import todosReducer from "../features/todos/todosSlice"; 
 
export const rootReducer = combineReducers({ 
    todos: todosReducer, 
});

export type RootState = ReturnType<typeof rootReducer>;
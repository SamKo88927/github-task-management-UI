

import { createContext, useEffect, useReducer } from "react"
import { login_failure, login_success, logout, start_login } from "../constants/actionTypes";
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user") as string) || null,
    loading: false,
    error:null,
}
export const LoginContext = createContext(
    {
        user: JSON.parse(localStorage.getItem("user") as string) || null as any,
        loading: false,
        error: {message: null},
        dispatch: (action: { type: string, payload: object | any; }) => { },
    });

interface MyActions {
    type: string;
    payload: object | any|null;
}
const LoginReducer = (state: any, action: MyActions) => {
    switch (action.type) {
        case start_login:
            return {
                user: null,
                loading: true,
                error: null
            };
        case login_success:
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case login_failure:
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case logout:
            return {
                user: null,
                loading: false,
                error: null
            };
        default:
            return state
    }
}
interface ContextProps {
    children: JSX.Element | JSX.Element[]
}

export const LoginContextProvider = ({ children }: ContextProps) => {
    const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user]
    )
    return (
        <LoginContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch,
            }}>
            {children}
        </LoginContext.Provider>
    )
}


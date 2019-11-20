import { Dispatch, Action } from "redux"
import { SIGN_IN_PROGRESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR } from '../types/user.types';
import { ProUser } from "../types/user.types"

export interface UserAction extends Action {
    type: string;
    user?: ProUser;
}

export const signIn = (username: string, password: string) => {
    return (dispatch: Dispatch<UserAction>) => {

        // example account
        let className = "B17DCCN046";
        let dateOfBirth = "1999-12-01T00:00:00.000Z"
        let description = "Some text here!"
        let displayName = "Proptit"
        let email = "abcde12345@gmail.com"
        let facebook = "fb.com/users"
        let id = "24b4e8a6-cfd3-4c91-8348-47f9d2c1681"
        let _password = "admin"
        let phoneNumber = "123456789"
        let reg_date = "2019-11-10T12:43:05.000Z"
        let _username =  "admin"

        dispatch({ type: SIGN_IN_PROGRESS })
        if (username === _username && password === _password) {
            dispatch({
                type: SIGN_IN_SUCCESS, 
                user: {
                    id: id,
                    username: _username,
                    password: _password,
                    displayName: displayName,
                    dateOfBirth: dateOfBirth,
                    description: description,
                    className: className,
                    email: email,
                    facebook: facebook,
                    phoneNumber: phoneNumber,
                    regDate: reg_date
                }
            })
        }
        else dispatch({type: SIGN_IN_ERROR})
    }
}
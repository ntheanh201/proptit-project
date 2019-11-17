import { Dispatch } from 'redux'
import { SIGN_IN_PROGRESS, SIGN_IN_SUCCESS, SIGN_IN_ERROR } from './user.types'


export class ProUser {
    className: string;
    dateOfBirth: string;
    description: string
    displayName: string;
    email: string;
    facebook: string;
    id: string;
    password: string;
    phoneNumber: string;
    regDate: string;
    username: string;

    constructor(
        id: string,
        username: string,
        password: string,
        dateOfBirth: string,
        description: string,
        displayName: string,
        email: string,
        facebook: string,
        phoneNumber: string,
        regDate: string) {

        this.id = id;
        this.username = username;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.description = description;
        this.displayName = displayName;
        this.email = email;
        this.facebook = facebook;
        this.phoneNumber = phoneNumber;
        this.regDate = regDate;
    }
}

export interface UserAction {
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
                type: SIGN_IN_SUCCESS, user: new ProUser(
                    id, 
                    username, 
                    password, 
                    dateOfBirth, 
                    description, 
                    displayName, 
                    email, 
                    facebook, 
                    phoneNumber, 
                    reg_date
                )
            })
        }
        dispatch({type: SIGN_IN_ERROR})
    }
}
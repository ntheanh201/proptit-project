export interface ProUser {
    className: string;
    dateOfBirth: string;
    description: string;
    displayName: string;
    email: string;
    facebook: string;
    id: string;
    password: string;
    phoneNumber: string;
    regDate: string;
    username: string;
  }

  export class UserManager {
    
    private static instance: UserManager;

    constructor() {
    }

    static getInstance(): UserManager {
      if (UserManager.instance == null) UserManager.instance = new UserManager();
      return UserManager.instance;
    }

    signIn(username: string, password: string) {
      
    }
  }
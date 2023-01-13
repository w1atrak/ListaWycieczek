export interface UserTypes{
    guest: boolean;
    user: boolean;
    admin: boolean;
    manager: boolean;
}

export class User {
    email: string;
    id: string;
    type: UserTypes;

    constructor(userData : any) {
        this.email = userData.email;
        this.id = userData.uid;
        this.type = {
            guest: true,
            user: true,
            admin: false,
            manager: false
        };
    }
}
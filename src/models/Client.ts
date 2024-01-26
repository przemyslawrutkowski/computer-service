import { User } from "./User";

export class Client extends User {

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        super(id, firstName, lastName, email, password, phoneNumber);
    }

    isServiceman(): boolean {
        return false;
    }
}

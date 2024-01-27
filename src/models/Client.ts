import { User } from "./User";

export class Client extends User {

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        super(id, firstName, lastName, email, password, phoneNumber);
    }

    static fromJson(object: any): Client {
        return new Client(object.id, object.firstName, object.lastName, object.email, object.password, object.phoneNumber);
    }

    isServiceman(): boolean {
        return false;
    }
}

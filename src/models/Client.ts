import { User } from "./User";

export class Client extends User {

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        super(id, firstName, lastName, email, password, phoneNumber);
    }

    static fromJson(json: any): Client {
        return new Client(json.id, json.firstName, json.lastName, json.email, json.password, json.phoneNumber);
    }

    isServiceman(): boolean {
        return false;
    }
}

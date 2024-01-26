export class User {
    protected id: number;
    protected firstName: string;
    protected lastName: string;
    protected email: string;
    protected password: string;
    protected phoneNumber: string;

    constructor(id: number, firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    getId(): number {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }
}
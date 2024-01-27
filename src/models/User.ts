export class User {
    protected id: string;
    protected firstName: string;
    protected lastName: string;
    protected email: string;
    protected password: string;
    protected phoneNumber: string;

    constructor(id: string, firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }

    public getId(): string {
        return this.id;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }
}
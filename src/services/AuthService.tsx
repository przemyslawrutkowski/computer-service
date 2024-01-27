import { Client } from '../models/Client';
import { Serviceman } from '../models/Serviceman';

const SERVICEMEN_API_URL = 'http://localhost:3000/servicemen';
const CLIENTS_API_URL = 'http://localhost:3000/clients';

export const login = async (email: string, password: string): Promise<Client | Serviceman> => {
    const response = await fetch(`${CLIENTS_API_URL}?email=${email}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const clientArray = await response.json();
        if (clientArray.length > 0) {
            const client = clientArray[0];
            return Client.fromJson(client);
        }
    }

    const servicemenResponse = await fetch(`${SERVICEMEN_API_URL}?email=${email}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (servicemenResponse.ok) {
        const servicemenArray = await servicemenResponse.json();
        if (servicemenArray.length > 0) {
            const serviceman = servicemenArray[0];
            return Serviceman.fromJson(serviceman);
        }
    }

    throw new Error('Login failed: User does not exist');
};

export const register = async (newClient: Client): Promise<Client> => {
    try {
        const clientResponse = await fetch(`${CLIENTS_API_URL}?email=${newClient.getEmail()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!clientResponse.ok) {
            throw new Error("Registration failed");
        }

        const clientUser = await clientResponse.json();

        if (Object.keys(clientUser).length > 0) {
            throw new Error('User already exists');
        } else {
            const servicemenResponse = await fetch(`${SERVICEMEN_API_URL}?email=${newClient.getEmail()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!servicemenResponse.ok) {
                throw new Error("Registration failed");
            }

            const servicemenUser = await servicemenResponse.json();

            if (Object.keys(servicemenUser).length > 0) {
                throw new Error('User already exists');
            } else {
                const newClientData = {
                    firstName: newClient.getFirstName(),
                    lastName: newClient.getLastName(),
                    email: newClient.getEmail(),
                    password: newClient.getPassword(),
                    phoneNumber: newClient.getPhoneNumber()
                };

                const registerResponse = await fetch(`${CLIENTS_API_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newClientData)
                });

                if (!registerResponse.ok) {
                    throw new Error('Registration failed');
                }

                return registerResponse.json();
            }
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserById = async (id: string): Promise<Client | Serviceman | null> => {
    try {
        const clientResponse = await fetch(`${CLIENTS_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (clientResponse.ok) {
            const client = await clientResponse.json();
            return Client.fromJson(client);
        }

        const servicemanResponse = await fetch(`${SERVICEMEN_API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (servicemanResponse.ok) {
            const serviceman = await servicemanResponse.json();
            return Serviceman.fromJson(serviceman);
        }

        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const SERVICEMEN_API_URL = 'http://localhost:3000/servicemen';
const CLIENTS_API_URL = 'http://localhost:3000/clients';

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${CLIENTS_API_URL}?email=${email}&password=${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const user = await response.json();

        if (!user) {
            throw new Error('User does not exist');
        }

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const register = async (email: string, firstName: string, lastName: string, phoneNumber: string, password: string) => {
    try {
        console.log(email, firstName, lastName, phoneNumber, password);
        const response = await fetch(`${CLIENTS_API_URL}?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        const user = await response.json();

        if (Object.keys(user).length > 0) {
            throw new Error('User already exists');
        } else {
            const registerResponse = await fetch(`${CLIENTS_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, firstName, lastName, phoneNumber, password })
            });

            if (!registerResponse.ok) {
                throw new Error('Registration failed');
            }

            return registerResponse.json();
        }


    } catch (error) {
        console.error(error);
        throw error;
    }
};
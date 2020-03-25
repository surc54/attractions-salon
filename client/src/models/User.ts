interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    phone?: string;
    role: "Guest" | "Admin" | "Owner";
    emailVerified: boolean;

    fullName: string;
}

export interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export default User;

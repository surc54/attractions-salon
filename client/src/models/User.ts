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

export default User;

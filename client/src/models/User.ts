interface User {
    id: string;
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

export const getUserInitials = (user?: User | null) => {
    if (!user || !user.fullName) {
        return "?";
    }

    let initials = user.fullName
        .split(" ")
        .map((x) => x.substr(0, 1))
        .join("")
        .trim()
        .substr(0, 2);
    return initials;
};

export interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export default User;

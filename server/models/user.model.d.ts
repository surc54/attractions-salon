import mongoose from "mongoose";

interface IUser {
    /**
     * Name of user (split to first and last)
     */
    name: {
        first: string;
        last: string;
    };

    /**
     * Email of user
     */
    email: string;

    /**
     * Status of email verification
     */
    emailVerified: boolean;

    /**
     * Phone number
     */
    phone?: string;

    /**
     * Hash password
     */
    password: string;

    /**
     * Role of user
     *
     * "Guest", "Admin", "Owner"
     */
    role: "Guest" | "Admin" | "Owner";

    // --- VIRTUALS ---

    /**
     * (VIRTUAL) Combine first and last name
     */
    fullName: string;
}

interface IUserModel extends IUser, mongoose.Document {
    /**
     * Check if input password matches user's password
     * @param password password to check
     */
    validPassword(password: string): boolean;

    /**
     * Hash and set input password
     * @param password password to set (raw, non-hashed)
     */
    setPassword(password: string): void;

    /**
     * Check if role == "Guest"
     */
    isGuest(): boolean;

    /**
     * Check if role == "Admin"
     */
    isAdmin(): boolean;

    /**
     * Check if role == "Owner"
     */
    isOwner(): boolean;
}

declare const User: mongoose.Model<IUserModel> & {
    // DECLARE STATICS HERE
    /**
     * Hash password using bcrypt
     * @param password password to hash (raw)
     */
    hashPassword(password: string): string;
};

export = User;

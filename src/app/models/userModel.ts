export interface User{
    id?: number;
    name?: string;
    email: string;
    role?: string;
    password?: string;
    token?: string; // האם למחוק???
}

export interface UserAuthResponse{
    user: User;
    token: string;
}

// password????
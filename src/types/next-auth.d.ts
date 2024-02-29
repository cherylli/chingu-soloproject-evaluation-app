import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            image: string,
            role: string,
            name: string,
            evaluatorEmail: string,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: string | null,
        evaluatorEmail: string | null,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
        evaluatorEmail: string,
    }
}
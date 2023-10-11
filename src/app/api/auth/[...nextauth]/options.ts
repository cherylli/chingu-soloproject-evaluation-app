import type { NextAuthOptions} from "next-auth";
import GithubProvider, {GithubProfile} from 'next-auth/providers/github'
import {getUserfromDb} from "@/services/users";
import {ChinguAppRole} from "@/types/UserTypes";

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            profile(profile:GithubProfile){
                return {
                    ...profile,
                    id: profile.id.toString(),
                    image: profile.avatar_url ?? '/avatar.svg',
                    // get role and evaluator email from airtable in signin callback
                    role: null,
                    evaluatorEmail:null
                }
            },
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    callbacks: {
        // check users.email against airtable, to make sure this person is authorized
        async signIn({user}){
            const userFromDb = await getUserfromDb(user.email!!)
            if(userFromDb.userFound){
                user.role = userFromDb.role as ChinguAppRole
                user.evaluatorEmail = userFromDb.evaluatorEmail as string
            }
            return userFromDb.userFound
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role as string
                token.evaluatorEmail = user.evaluatorEmail as string
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role
                session.user.evaluatorEmail = token.evaluatorEmail
            }
            return session
        },
    }
}
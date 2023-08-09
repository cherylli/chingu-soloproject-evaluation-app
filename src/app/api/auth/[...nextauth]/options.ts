import type { NextAuthOptions} from "next-auth";
import GithubProvider, {GithubProfile} from 'next-auth/providers/github'
import {transformData, userTable} from "@/lib/airtable";

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
            const appUserRes = await userTable.select({
                filterByFormula: `{github email} = \"${user.email}\"`
            }).firstPage()
            if (appUserRes.length===0) {
                return false
            }
            user.role = appUserRes[0].fields.role as string ?? "not found"
            user.evaluatorEmail = appUserRes[0].fields['evaluator email'] as string ?? "not found"
            return true
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
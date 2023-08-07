import type { NextAuthOptions} from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import {transformData, userTable} from "@/lib/airtable";

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
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
            const appUser = transformData(appUserRes)
            console.log("signin callback - ", appUser)
            // TODO: put appUser.fields["evaluator email"] into Auth context
            return true
        }
    }
}
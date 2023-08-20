import {ChinguAppRole, ChinguRole} from "@/types/UserTypes";
import {userTable} from "@/lib/airtable";

type UserReturnType = {
    userFound: boolean
    evaluatorEmail?: string,
    role?: ChinguAppRole
}
/**
 *  Returns users "Evaluator" email, and role, from airtable
 *
 *  @param githubEmail - Users feedback email returned by next-auth feedback provider
 */
export const getUserfromDb = async(
    githubEmail:string
):Promise<UserReturnType> => {
    const user = await userTable.select({
        filterByFormula: `{github email} = \"${githubEmail}\"`
    }).firstPage()
    if (user.length === 0) {
        return {
            userFound:false
        }
    }
    const appRole = (user[0].fields["Role"] as ChinguRole[]).includes("Chingu admin") ?
        "admin": "evaluator"
    return {
        userFound: true,
        evaluatorEmail: user[0].fields['evaluator email'] as string ?? "no value",
        role: appRole
    }
}
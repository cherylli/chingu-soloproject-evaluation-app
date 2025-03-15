import { ChinguAppRole, ChinguRole, StatusType } from "@/types/UserTypes";
import {userTable} from "@/lib/airtable";

type UserReturnType = {
    userFound: boolean
    evaluatorEmail?: string,
    roles?: ChinguAppRole[],
    status?: StatusType
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

    return {
        userFound: true,
        evaluatorEmail: user[0].fields['evaluator email'] as string ?? "no value",
        roles: mapRoles(user[0].fields["Role"] as ChinguRole[]),
        status: user[0].fields["Status"] as StatusType,
    }
}

const mapRoles = (roles: ChinguRole[]): ChinguAppRole[] => {
    const rolesMap = new Map<ChinguRole, ChinguAppRole>([
        ["Chingu admin", 'admin'],
        ["Evaluator", 'evaluator'],
    ])

    const appRoles = new Set<ChinguAppRole>([])

    roles
        .map(role=>rolesMap.get(role))
        .filter((appRole): appRole is ChinguAppRole => appRole !== undefined)
        .forEach(appRole=>appRoles.add(appRole))

    return [...appRoles]
}
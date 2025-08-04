import { useSession } from "next-auth/react";


export const useRoleCheck = () => {
    const { data: session, status } = useSession()

    return {
        isAdmin: session?.user.roles.includes("admin"),
        isEvaluator: session?.user.roles.includes("evaluator"),
        isLoading: status === "loading"
    }
}
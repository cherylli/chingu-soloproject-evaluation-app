import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {SoloProjectTier} from "@/types/SoloProjectTypes";
import {updateSoloProjectById} from "@/services/soloProjects";
import {toast} from "react-hot-toast";

const tierMap: {[key: string]: SoloProjectTier} = {
    "1": "Tier 1 - Beginner (ONLY for Developer role)",
    "2": "Tier 2  - Intermediate (All roles)",
    "3": "Tier 3 - Experienced (All roles)",
    "*Tier1": "Tier 1 - Beginner (ONLY for Developer role)",
    "*Tier2": "Tier 2  - Intermediate (All roles)",
    "*Tier3": "Tier 3 - Experienced (All roles)",
}

const SetTierBtn = ({
    soloProjectId,
    tier,
    children,
    onSuccess
}: {
    soloProjectId: string,
    tier: string,
    children: ReactNode
    onSuccess?: (newTier: SoloProjectTier) => void
}) => {

    const handleSetTier = async () => {
        if (!tierMap[tier]) {
            toast.error("Invalid tier")
        }

        try {
            const res = await toast.promise(
                updateSoloProjectById(soloProjectId, {
                    "Tier": tierMap[tier],
                }), {
                    loading: "Setting Tier...",
                    success: `Tier set to ${tierMap[tier]}`,
                    error: "Failed to set tier"
                }
            )
            if(res.success) {
                onSuccess?.(res.data?.fields.Tier as SoloProjectTier)
            }
        }catch (e) {
            if (e instanceof Error)
                toast.error("Error setting tier: " + e.message)
            else {
                toast.error("Error setting tier")
            }
        }
    }

    return (
        <Button
            variant="outline"
            className="cursor-pointer"
            disabled={!tierMap[tier]}
            onClick={handleSetTier}
        >
            {children}
        </Button>
    )
}

export default SetTierBtn
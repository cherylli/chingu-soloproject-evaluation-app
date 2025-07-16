import {Button} from "@/components/ui/button";
import {ReactNode} from "react";
import {SoloProjectTier} from "@/types/SoloProjectTypes";

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
    children
}: {
    soloProjectId: string,
    tier: string,
    children: ReactNode
}) => {

    const handleSetTier = () => {
        console.log("set tier: ", tierMap[tier], soloProjectId)
    }

    return (
        <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleSetTier}
        >
            {children}
        </Button>
    )
}

export default SetTierBtn
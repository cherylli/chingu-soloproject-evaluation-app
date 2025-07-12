import {SoloProjectTier} from "@/types/SoloProjectTypes";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";

const SetTierButton = ({
    tier,
    btnText
}: {
    tier: SoloProjectTier,
    btnText: string
}) => {
    const params = useParams()
    return (
        <Button>
            {btnText}

        </Button>
    )
}

export default SetTierButton
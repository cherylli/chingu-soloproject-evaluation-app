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
        <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white cursor-pointer py-2">
            {btnText}

        </Button>
    )
}

export default SetTierButton
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {FilteredFields, SoloProjectTier, Submission} from "@/types/SoloProjectTypes";
import {setTier, updateSoloProjectById} from "@/services/soloProjects";
import {useParams} from "next/navigation";
import {toast} from "react-hot-toast";

const TierSuggestion = ({
    onSuccess
}: {
    onSuccess: (field: keyof FilteredFields, value: string) => void
}) => {
    //const [tier, setTier] = useState<SoloProjectTier|undefined>()
    const dropDownValues: { text: string, value: SoloProjectTier }[] = [
        {text: "Tier 1", value: "*Tier1"},
        {text: "Tier 2", value: "*Tier2"},
        {text: "Tier 3", value: "*Tier3"}
    ]

    const params = useParams()

    const handleTierChange = async (tier: SoloProjectTier) => {
        console.log("change tier to: ", tier, params.id)
        const res = await toast.promise(
            updateSoloProjectById(params.id as string, {
                "Tier": tier,
            }), {
                loading: "Setting Tier...",
                success: `Tier set to ${tier}`,
                error: "Failed to set tier"
            }
        )
        if(res.success) {
            onSuccess("Tier", tier)
        }
    }
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Suggest Tier</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup onValueChange={(value: string) => handleTierChange(value as SoloProjectTier)}>
                    {dropDownValues.map(v => (
                        <DropdownMenuRadioItem
                            value={v.value}
                            key={v.value}
                        >{v.text}</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

export default TierSuggestion
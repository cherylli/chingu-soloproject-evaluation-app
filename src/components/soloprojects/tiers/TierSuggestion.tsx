import SetTierButton from "@/components/soloprojects/tiers/SetTierButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const TierSuggestion = () => {
    return <>
        <DropdownMenu>
            <DropdownMenuTrigger className="border rounded border-green-700 cursor-pointer hover:bg-green-700">
                Suggest Tier
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Tier 1</DropdownMenuItem>
                <DropdownMenuItem>Tier 2</DropdownMenuItem>
                <DropdownMenuItem>Tier 3</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-row gap-5 w-full">
            <SetTierButton tier="*Tier1" btnText="Tier 1"/>
            <SetTierButton tier="*Tier2" btnText="Tier 2"/>
            <SetTierButton tier="*Tier3" btnText="Tier 3"/>
        </div>
    </>
 }
 
 export default TierSuggestion
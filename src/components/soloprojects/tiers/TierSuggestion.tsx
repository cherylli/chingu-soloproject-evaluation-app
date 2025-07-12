import SetTierButton from "@/components/soloprojects/tiers/SetTierButton";

const TierSuggestion = () => {
    return(
        <div className="flex flex-row gap-5 w-full">
            <SetTierButton tier="*Tier1" btnText="Tier 1"/>
            <SetTierButton tier="*Tier2" btnText="Tier 2"/>
            <SetTierButton tier="*Tier3" btnText="Tier 3"/>
        </div>
    )
 }
 
 export default TierSuggestion
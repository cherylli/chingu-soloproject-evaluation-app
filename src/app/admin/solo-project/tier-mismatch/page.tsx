import {getTierMismatchedSoloProjects} from "@/services/soloProjects";
import TierMismatchTable from "@/components/soloprojects/tiers/TierMismatchTable";
import H1 from "@/components/ui/typography/h1";
import P from "@/components/ui/typography/p";

const SoloProjectTierMismatchPage = async () => {
    const records = await getTierMismatchedSoloProjects()



    return(
        <div>
            <H1>Solo Projects with Mismatched Tiers</H1>
            <P>This page shows all the solo projects with wrong tier flagged by evaluators.
                Click &ldquo;Accept&rdquo; to accept the suggestion or manually set tier with the &ldquo;Set Tier&rdquo; buttons</P>
            <TierMismatchTable records={records}/>
        </div>
    )
 }
 
 export default SoloProjectTierMismatchPage
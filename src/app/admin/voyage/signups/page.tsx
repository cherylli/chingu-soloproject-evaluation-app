import {getLastestVoyageSignups} from "@/services/voyages";
import H1 from "@/components/ui/typography/h1";
import P from "@/components/ui/typography/p";
import VoyageSignupTable from "@/components/voyages/signups/VoyageSignupTable";

export const dynamic = 'force-dynamic'

const VoyageSignupPage = async () => {
    const signups = await getLastestVoyageSignups()
    return(
        <>
            <H1>VoyageSignupPage - All latest signups</H1>
            <P>This page is still WIP. Currently just showing the latest 20 signups</P>
            <VoyageSignupTable
                records={signups}
                atBaseUrl={`https://airtable.com/${process.env.AIRTABLE_BASEID}/${process.env.AIRTABLE_VOYAGE_SIGNUP_TABLEID}`}
            />
        </>
    )
 }
 
 export default VoyageSignupPage
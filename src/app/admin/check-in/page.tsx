export const dynamic = 'force-dynamic'


// TODO: move under voyage
import H1 from "@/components/ui/typography/h1";

import { getLastestCheckIns } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";

const VoyageCheckIn = async () => {
    const checkin = await getLastestCheckIns()

    return(
        <>
            <H1>Latest 100 Voyage Check-ins</H1>
            <CheckinTable records={checkin} />
        </>
    )
 }

 export default VoyageCheckIn
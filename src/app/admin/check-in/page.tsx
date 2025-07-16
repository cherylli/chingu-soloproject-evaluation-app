import H1 from "@/components/ui/typography/h1";

export const dynamic = 'force-dynamic'

import { getLastestCheckIns } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";

const VoyageCheckIn = async () => {
    const checkin = await getLastestCheckIns()

    return(
        <div>
            <H1>Latest 100 Voyage Check-ins</H1>
            <CheckinTable records={checkin} />
        </div>
    )
 }

 export default VoyageCheckIn
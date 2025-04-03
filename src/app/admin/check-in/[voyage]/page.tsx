import { getCheckInsByVoyage } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";


const CheckinByVoyagePage = async ({ params }: { params: { voyage: string } }) => {
    const records = await getCheckInsByVoyage(params.voyage)

    if (!records || !records.length) {
        return <div>No record found for voyage {params.voyage}</div>
    }

    return <CheckinTable records={records}/>

}

export default CheckinByVoyagePage
import { getCheckInsByVoyage } from "@/services/checkins";
import CheckinTable from "@/components/checkins/checkinTable";


const CheckinByVoyagePage = async (props: { params: Promise<{ voyage: string }> }) => {
    const params = await props.params;
    const records = await getCheckInsByVoyage(params.voyage)

    if (!records || !records.length) {
        return <div>No record found for voyage {params.voyage}</div>
    }

    return <>
        <h1 className="text-center">{params.voyage} Checkins</h1>
        <CheckinTable records={records}/>
    </>
}

export default CheckinByVoyagePage
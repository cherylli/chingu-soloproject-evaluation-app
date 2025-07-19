// TODO: this will be a page to show all the voyages, links to signups, checkin etc
import H1 from "@/components/ui/typography/h1";
import Link from "next/link";

const VoyageSchedule = () => {
    return(
        <>
            <H1>VoyageSchedule</H1>
            <Link href={`/admin/voyage/56/signups`}>V56</Link>
            <Link href={`/admin/voyage/57/signups`}>V57</Link>
        </>
    )
 }
 
 export default VoyageSchedule
import {getSoloProjectsByStatus} from "@/services/soloProjects";
import ProjectSubmissionList from "@/components/soloprojects/List";
import {Card, CardContent} from "@/components/ui/card";
import SoloProjectTable from "@/components/soloprojects/soloProjectTable";

// TODO: refactor other pages to use this component
const FetchProjects = async ({
                                 status = "Waiting Eval",
                                 noRecordMessage = "No record found",
                             }: {
    status?: string,
    noRecordMessage?: string
}) => {
    const records = await getSoloProjectsByStatus(status)
    return <>{
        records.length === 0
            ? <Card className="w-[380px] pt-5 flex items-center justify-center m-auto">
                <CardContent>{noRecordMessage}</CardContent>
            </Card>
            : <>
                <ProjectSubmissionList records={records}/>
                <SoloProjectTable records={records}/>
            </>
    }</>
}

export default FetchProjects

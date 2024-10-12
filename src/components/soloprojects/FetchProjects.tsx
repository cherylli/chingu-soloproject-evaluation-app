import {getSoloProjectsByStatus} from "@/services/soloProjects";
import ProjectSubmissionList from "@/components/soloprojects/List";
import {Card, CardContent} from "@/components/ui/card";

// TODO: refactor other pages to use this component
const FetchProjects = async ({
                                 status = "Waiting Eval",
                                 noRecordMessage = "No records found",
                             }: {
    status: string,
    noRecordMessage: string
}) => {
    const records = await getSoloProjectsByStatus(status)
    return <>{
        records.length === 0
            ? <Card className="w-[380px] m-5 pt-5 flex items-center justify-center">
                // TODO: if frontpage show below otherwise something else
                <CardContent>{noRecordMessage}</CardContent>
            </Card>
            : <ProjectSubmissionList records={records}/>
    }</>
}

export default FetchProjects

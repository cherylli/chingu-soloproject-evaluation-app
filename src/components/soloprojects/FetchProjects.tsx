import {getSoloProjectsByStatus} from "@/services/soloProjects";
import {Card, CardContent} from "@/components/ui/card";
import SoloProjectTable from "@/components/soloprojects/soloProjectTable";
import {revalidatePath} from "next/cache";
import {RefreshData} from "@/lib/RefreshData";

const FetchProjects = async ({
                                 status = "Waiting Eval",
                                 noRecordMessage = "No record found",
                             }: {
    status?: string,
    noRecordMessage?: string
}) => {
    const records = await getSoloProjectsByStatus(status)

    async function refreshRecords() {
        'use server'
        revalidatePath('/')
    }

    const dateFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    } as const;

    return <div className="flex flex-col gap-5 mb-10">{
        records.length === 0
            ? <Card className="w-[380px] pt-5 flex items-center justify-center m-auto">
                <CardContent>{noRecordMessage}</CardContent>
            </Card>
            : <>
                <SoloProjectTable records={records}/>
            </>
    }
        <RefreshData ms={10*60*1000} refreshAction={refreshRecords} />
        <div className="self-center text-sm text-gray-500">
            Last Refresh: {new Intl.DateTimeFormat('en-US', dateFormatOptions).format(new Date())}
        </div>
    </div>
}

export default FetchProjects

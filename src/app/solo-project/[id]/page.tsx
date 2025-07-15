import {
    getAllSoloProjectsByUser,
    getSoloProjectById
} from "@/services/soloProjects";
import ProjectSubmissionDetail from "@/components/soloprojects/details/BaseDetails";
import Comments from "@/components/comments";
import FeedbackContainer from "@/components/feedback/FeedbackContainer";
import CompactList from "@/components/soloprojects/CompactList";
import ReadOnly from "@/components/soloprojects/details/ReadOnly";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const SoloProjectPage = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const record = await getSoloProjectById(params.id)
    const projects = await getAllSoloProjectsByUser(record.fields["Discord ID"], record.fields.Email)


    return (
        record.fields["Evaluation Status"] === "Passed" ?
            <ReadOnly record={record}/> :
            <ResizablePanelGroup direction="horizontal" className="flex-col! lg:flex-row!">
                <ResizablePanel defaultSize={50} className="basis-auto! md:basis-0!">
                    <div className="hidden lg:h-[calc(100vh-110px)] lg:block lg:overflow-y-auto">
                        <FeedbackContainer discordName={record.fields["Discord Name"]}/>
                    </div>
                </ResizablePanel>
                <ResizableHandle className="hidden lg:flex"/>
                <ResizablePanel defaultSize={50} className="basis-auto! lg:basis-0!">
                    <div className="lg:h-[calc(100vh-110px)] lg:overflow-y-auto">
                        {projects.length > 1 && <CompactList records={projects}/>}
                        <ProjectSubmissionDetail
                            record={record}
                        />
                        <Comments recordId={params.id}/>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
    )
}

export default SoloProjectPage
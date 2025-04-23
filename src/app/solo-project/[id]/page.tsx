import {
    getAllSoloProjectsByUser,
    getSoloProjectById,
    setEvaluatorOnDb,
    removeEvaluatorOnDb,
    updateSoloProjectById
} from "@/services/soloProjects";
import ProjectSubmissionDetail from "@/components/soloprojects/details/BaseDetails";
import { ActionResponse } from "@/types";
import Comments from "@/components/comments";
import FeedbackContainer from "@/components/feedback/FeedbackContainer";
import CompactList from "@/components/soloprojects/CompactList";
import ReadOnly from "@/components/soloprojects/details/ReadOnly";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const SoloProjectPage = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const record = await getSoloProjectById(params.id)
    const projects = await getAllSoloProjectsByUser(record.fields["Discord ID"], record.fields.Email)
    const handleSave = async (evalFeedback: string, evalStatus: string): Promise<ActionResponse> => {
        'use server'
        return await updateSoloProjectById(params.id, {
            "Evaluation Feedback": evalFeedback,
            "Evaluation Status": evalStatus,
        })
    }
    const handleStatusChange = async (evalStatus: string): Promise<ActionResponse> => {
        'use server'
        return await updateSoloProjectById(params.id, {
            "Evaluation Status": evalStatus,
        })
    }
    const handleSetEvaluator = async (): Promise<ActionResponse> => {
        'use server'
        return await setEvaluatorOnDb(params.id)
    }
    const handleRemoveEvaluator = async (): Promise<ActionResponse> => {
        'use server'
        return await removeEvaluatorOnDb(params.id)
    }


    return (
        record.fields["Evaluation Status"] === "Passed" ?
            <ReadOnly record={record}
                      handleStatusChange={handleStatusChange}/> :
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                    <div className="hidden lg:block lg:overflow-y-auto lg:max-h-screen">
                        <FeedbackContainer discordName={record.fields["Discord Name"]}/>
                    </div>
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={50}>
                    <div className="lg:overflow-y-auto">
                        {projects.length > 1 && <CompactList records={projects}/>}
                        <ProjectSubmissionDetail
                            record={record}
                            handleSave={handleSave}
                            handleSetEvaluator={handleSetEvaluator}
                            handleRemoveEvaluator={handleRemoveEvaluator}
                        />
                        <Comments recordId={params.id}/>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
    )
}

export default SoloProjectPage
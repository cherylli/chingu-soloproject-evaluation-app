import Comments from '@/components/comments';
import FeedbackContainer from '@/components/feedback/FeedbackContainer';
import CompactList from '@/components/soloprojects/CompactList';
import ProjectSubmissionDetail from '@/components/soloprojects/details/BaseDetails';
import ReadOnly from '@/components/soloprojects/details/ReadOnly';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import {
  getSoloProjectById,
  getSoloProjectsByMemberDiscordId,
} from '@/services/soloProjects';

const SoloProjectPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const record = await getSoloProjectById(params.id);
  if (!record.success)
    return <div>Error fetching Project</div>;

  const projects = await getSoloProjectsByMemberDiscordId(
    record.data.fields['Discord ID']
  );

  if (!projects.success)
    return (
      <div>Error fetching other projects by the user</div>
    );

  return record.data.fields['Evaluation Status'] ===
    'Passed' ? (
    <ReadOnly record={record.data} />
  ) : (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex-col! lg:flex-row!"
    >
      <ResizablePanel
        defaultSize={50}
        className="basis-auto! md:basis-0!"
      >
        <div className="hidden lg:h-[calc(100vh-110px)] lg:block lg:overflow-y-auto">
          <FeedbackContainer
            discordId={record.data.fields['Discord ID']}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle className="hidden lg:flex" />
      <ResizablePanel
        defaultSize={50}
        className="basis-auto! lg:basis-0!"
      >
        <div className="lg:h-[calc(100vh-110px)] lg:overflow-y-auto">
          {projects.data.length > 1 && (
            <CompactList records={projects.data} />
          )}
          <ProjectSubmissionDetail
            record={record.data}
            atBaseUrl={getATBaseURL('solo-project')}
          />
          <Comments recordId={params.id} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SoloProjectPage;

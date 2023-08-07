import ProjectSubmissionList from "@/components/soloprojects/List";
import Link from "next/link";
import {getSoloProjectsByStatus} from "@/services/soloProjects";

export default async function Home() {
    const records = await getSoloProjectsByStatus("Waiting Eval")
    return <>
        <ProjectSubmissionList records={records}/>
        <Link
            href={'https://github.com/chingu-voyages/soloproject-evaluation'}
        >Solo Project Evaluation Conditions and Feedback
        </Link>
    </>
}

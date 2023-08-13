import ProjectSubmissionList from "@/components/soloprojects/List";
import Link from "next/link";
import {getSoloProjectsByStatus} from "@/services/soloProjects";

export default async function Home() {
    const records = await getSoloProjectsByStatus("Waiting Eval")
    return <>
        <ProjectSubmissionList records={records}/>
        <div className="mt-5"> Github Repo:
            <Link className="ml-3 text-blue-500 hover:underline"
                href={'https://github.com/chingu-voyages/soloproject-evaluation'}
                target="_blank" rel="noopener noreferrer"
            >Solo Project Evaluation Conditions and Feedback
            </Link>
        </div>
    </>
}

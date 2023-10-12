export const dynamic = 'force-dynamic'
export const revalidate = 0

import ProjectSubmissionList from "@/components/soloprojects/List";
import Link from "next/link";
import {getSoloProjectsByStatus} from "@/services/soloProjects";

export default async function Home() {
    const records = await getSoloProjectsByStatus("Waiting Eval")
    return <>
        <ProjectSubmissionList records={records}/>
        <div className="ml-5">
            <div className="mt-5"> Feedback Github Repo:
                <Link className="ml-3 text-blue-500 hover:underline"
                      href={'https://github.com/chingu-voyages/soloproject-evaluation'}
                      target="_blank" rel="noopener noreferrer"
                >Solo Project Evaluation Conditions and Feedback
                </Link>
            </div>
            <div> Feedback:
                <Link className="ml-3 text-blue-500 hover:underline"
                      href={'/feedback'}
                      target="_blank" rel="noopener noreferrer"
                >Searchable Feedback
                </Link>
            </div>
            <div> App repo:
                <Link className="ml-3 text-blue-500 hover:underline"
                      href={'https://github.com/cherylli/chingu-soloproject-evaluation-app'}
                      target="_blank" rel="noopener noreferrer"
                >Readme, suggestions and reporting bugs
                </Link>
            </div>
        </div>
    </>
}

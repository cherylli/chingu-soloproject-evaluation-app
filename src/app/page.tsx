import {Card, CardContent} from "@/components/ui/card";

export const dynamic = 'force-dynamic'
export const revalidate = 0

import ProjectSubmissionList from "@/components/soloprojects/List";
import Link from "next/link";
import {getSoloProjectsByStatus} from "@/services/soloProjects";

export default async function Home() {
    const records = await getSoloProjectsByStatus("Waiting Eval")
    return <>
        {
            records.length === 0
                ? <Card className="w-[380px] m-5 pt-5 flex items-center justify-center">
                    <CardContent>No project awaiting evaluation. 😎</CardContent>
                </Card>
                : <ProjectSubmissionList records={records}/>
        }
        <div className="m-5">
            <p>We want our feedback to achieve these goals:</p>
            <ul className="list-disc m-5">
                <li>
                    Provide feedback to help our Members become better Developers.
                </li>
                <li>
                    Provide feedback to help our Members correct issues,
                    but also to encourage practices we find that they are doing well.
                </li>
                <li>
                    Provide feedback that is consistent & fair, regardless of who performs the Solo Project evaluation.
                </li>
            </ul>
            <p>
                Keep in mind that we don&apos;t do strict, university-style evaluations.
                We don&apos;t expect Solo Projects to be perfect apps.&nbsp;
                <b className="underline">We actually want members to pass</b> if their project has a readme and works
                properly,
                even though it may contain minor flaws.
            </p>

        </div>
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

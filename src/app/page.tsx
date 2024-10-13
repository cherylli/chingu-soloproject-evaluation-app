export const dynamic = 'force-dynamic'
export const revalidate = 0

import Link from "next/link";

import {Suspense} from "react";
import FetchProjects from "@/components/soloprojects/FetchProjects";
import {ProjectSubmissionListSkeleton} from "@/components/soloprojects/List";

export default async function Home() {


    return <>
        <Suspense fallback={<ProjectSubmissionListSkeleton/>}>
            <FetchProjects
                status="Waiting Eval"
                noRecordMessage="No project awaiting evaluation. 😎"
            />
        </Suspense>
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
            <div className="mt-5"> Tier Requirements:
                <Link className="ml-3 text-blue-500 hover:underline"
                      href={'https://github.com/chingu-voyages/Handbook/blob/main/docs/guides/soloproject/soloproject.md#1-choose-your-tier-1%EF%B8%8F%E2%83%A3-2%EF%B8%8F%E2%83%A3-3%EF%B8%8F%E2%83%A3'}
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Tier Requirements (Handbook)"
                >Tier Requirements (Handbook)
                </Link>
            </div>
            <div className="flex"> Feedback Github Repo:
                <Link className="ml-3 text-blue-500 hover:underline"
                      href={'https://github.com/chingu-voyages/soloproject-evaluation'}
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Solo Project Evaluation Conditions and Feedback"
                >Solo Project Evaluation Conditions and Feedback
                </Link>
                <div className="mx-3 text-blue-300">|</div>
                <Link className="text-blue-500 hover:underline"
                      href={'https://github.com/chingu-voyages/soloproject-evaluation#example-feedback'}
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Examples"
                >(Examples)
                </Link>
            </div>
            <div> Feedback:
                <Link className="ml-3 text-blue-500 hover:underline"
                      href={'/feedback'}
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Searchable Feedback"
                >Searchable Feedback
                </Link>
            </div>
            <div> App repo:
                <Link className="ml-3 text-blue-500 hover:underline"
                      href={'https://github.com/cherylli/chingu-soloproject-evaluation-app'}
                      target="_blank" rel="noopener noreferrer"
                      aria-label="Readme, suggestions and reporting bugs"
                >Readme, suggestions and reporting bugs
                </Link>
            </div>
        </div>
    </>
}

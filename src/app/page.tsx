import ProjectSubmissionList from "@/components/soloprojects/List";
import Link from "next/link";

const getAllWaitingSoloProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/soloprojects/waiting`,
        {cache:"no-store"}
    )
    return res.json()
}

export default async function Home() {
    const records = await getAllWaitingSoloProjects()
    return <>
        <ProjectSubmissionList records={records}/>
        <Link
            href={'https://github.com/chingu-voyages/soloproject-evaluation'}
        >Solo Project Evaluation Conditions and Feedback
        </Link>
    </>
}

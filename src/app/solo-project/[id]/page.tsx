"use client"

import useSWR from "swr";
import Link from "next/link";
import {Submission} from "@/types/SoloProjectTypes";
import {useEffect, useState} from "react";
import {fetcher} from "@/lib/fetcher";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {roleColors} from "@/styles/roles";
import {PencilLine} from "lucide-react";

const SoloProjectSingleEntry = ({params}: { params: { id: string } }) => {
    const [evaluator, setEvaluator] = useState('')
    const [evalNotes, setEvalNotes] = useState('');
    const {data: record, error} = useSWR<Submission, Error>(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/soloprojects/${params.id}`,
        fetcher,
        { refreshInterval: 60 * 60 * 10 }
    );

    useEffect(() => {
        if (record) {
            setEvalNotes(record.fields['Evaluation Feedback']);
            setEvaluator(record.fields.Evaluator)
        }
    }, [record]);

    if (error) return <div>Failed to load</div>;
    if (!record) return <div>Loading...</div>;

    const handleSave = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/soloprojects/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                fields: {
                    'Evaluation Feedback': evalNotes,
                },
            }),
        })
            .then((res) => res.json())
            .then((json) => alert(`Record updated: ${json[0].id}`));
    }

    // TODO: temp value, this will be obtained from current logged in user info
    // Evaluator must be an option already available in airtable
    const handleSetEvaluator = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/soloprojects/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                fields: {
                    'Evaluator': 'webmaster@cherylli.com',
                },
            }),
        })
            .then((res) => res.json())
            .then((json) => setEvaluator(json[0].fields.Evaluator));
    }

    return <div>
        <section className="flex flex-col gap-5 w-[90%] mx-auto">
            <h1 className="text-2xl text-center mt-5">
                {record.fields["Discord Name"]}
            </h1>
            <div className={`text-center ${roleColors[record.fields["Voyage Role (from Applications link)"]].bg} py-1`}>
                {record.fields["Voyage Role (from Applications link)"]}
            </div>
            <div>{record.fields["Timestamp"].toString()}</div>
            <div>{record.fields.Tier}</div>
            <table className="table-auto">
                <tr>
                    <td>Deployed App URL: </td>
                    <td className="px-4 text-blue-500 hover:underline">
                        <Link
                            href={record.fields["Deployed App URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{record.fields["Deployed App URL"]}</Link>
                    </td>
                </tr>
                <tr>
                    <td>Github Repo URL: </td>
                    <td className="px-4 text-blue-500 hover:underline">
                        <Link
                            href={record.fields["GitHub Repo URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{record.fields["GitHub Repo URL"]}</Link>
                    </td>
                </tr>
                <tr>
                    <td>Evaluator: </td>
                    <td className="px-4">{evaluator}</td>
                </tr>
            </table>
            <Button className="bg-green-700 light:text-white-200 hover:bg-green-900 disabled:bg-gray-500"
                    disabled={!!evaluator}
                    onClick={handleSetEvaluator}
            >
                <PencilLine className="mr-2 h-4 w-4"/>
                Evaluate This
            </Button>
            <Textarea
                className="h-[500px]"
                value={evalNotes}
                onChange={e => setEvalNotes(e.target.value)}
            />
            <br/>
            <div>{record.fields["Evaluation Status"]}</div>
            <Button onClick={handleSave}>Save</Button>
        </section>
        <Link href={"/"}>Back to List</Link>
    </div>
}

export default SoloProjectSingleEntry
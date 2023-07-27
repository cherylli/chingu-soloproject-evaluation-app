"use client"

import useSWR from "swr";
import Link from "next/link";
import {Submission} from "@/types/SoloProjectTypes";
import {useEffect, useState} from "react";
import {fetcher} from "@/lib/fetcher";

const SoloProjectSingleEntry = ({params}: { params: { id: string } }) => {
    const [evalNotes, setEvalNotes] = useState('');
    const {data: record, error} = useSWR<Submission, Error>(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/soloprojects/${params.id}`,
        fetcher,
        { refreshInterval: 60 * 60 * 10 }
    );

    useEffect(() => {
        if (record) {
            setEvalNotes(record.fields['Evaluation Feedback']);
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

    return <div>
        <section className="flex-col gap-5">
            <h1 className="text-2xl text-center">
                {record.fields["Discord Name"]}
            </h1>
            <div>{record.fields["Timestamp"].toString()}</div>
            <div>{record.fields.Tier}</div>
            <table className="table-auto">
                <tr>
                    <td>Deployed App URL: </td>
                    <td className="px-4">
                        <Link
                            href={record.fields["Deployed App URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{record.fields["Deployed App URL"]}</Link>
                    </td>
                </tr>
                <tr>
                    <td>Github Repo URL: </td>
                    <td className="px-4">
                        <Link
                            href={record.fields["GitHub Repo URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{record.fields["GitHub Repo URL"]}</Link>
                    </td>
                </tr>
            </table>

            <textarea
                className="text-gray-800"
                value={evalNotes}
                onChange={e => setEvalNotes(e.target.value)}
            />
            <br/>
            <button className="border-1" onClick={handleSave}>Save</button>
        </section>
        <Link href={"/"}>Back to List</Link>
    </div>
}

export default SoloProjectSingleEntry
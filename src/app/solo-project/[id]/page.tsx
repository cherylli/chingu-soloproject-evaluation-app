"use client"

import useSWR from "swr";
import Link from "next/link";
import {Submission} from "@/types/SoloProjectTypes";
import {useEffect, useState} from "react";
import {fetcher} from "@/lib/fetcher";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {roleColors} from "@/styles/roles";
import {Check, ChevronsUpDown, PencilLine} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {evalStatusValues} from "@/lib/options";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {getDate} from "@/lib/getDate";

const SoloProjectSingleEntry = ({params}: { params: { id: string } }) => {
    const [evaluator, setEvaluator] = useState('')
    const [evalNotes, setEvalNotes] = useState('');
    const [statusOpen, setStatusOpen] = useState(false)
    const [evalStatus, setEvalStatus] = useState('')
    const {data: record, error} = useSWR<Submission, Error>(
        `${process.env.NEXT_PUBLIC_API_BASEURL}/soloprojects/${params.id}`,
        fetcher,
        { refreshInterval: 60 * 60 * 10 }
    );

    useEffect(() => {
        if (record) {
            setEvalNotes(record.fields['Evaluation Feedback']);
            setEvaluator(record.fields.Evaluator)
            setEvalStatus(record.fields["Evaluation Status"])
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
                    'Evaluation Date': getDate(),
                    'Evaluation Status': evalStatus
                },
            }),
        })
            .then((res) => res.json())
            //.then((json) => alert(`Record updated: ${json[0].id} \n Status: ${json[0].fields['Evaluation Status']}`));
            .then(json => console.log(json))
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
                <tbody>
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
                </tbody>
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
            <div className="flex gap-5 items-center">
                <div>Evaluation Status</div>
                <Popover open={statusOpen} onOpenChange={setStatusOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={statusOpen}
                            className="w-[200px] justify-between"
                        >
                            {evalStatus}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search status..." />
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                                {evalStatusValues.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        onSelect={(_) => {
                                            setEvalStatus(status.value)
                                            setStatusOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                evalStatus === status.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {status.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <Button onClick={handleSave}>Save</Button>
        </section>
        <Link href={"/"}>Back to List</Link>
    </div>
}

export default SoloProjectSingleEntry
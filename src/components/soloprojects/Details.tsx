'use client'

import {EvaluationStatus, FilteredFields, Submission} from "@/types/SoloProjectTypes";
import {roleColors} from "@/styles/roles";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PencilLine} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {evalStatusValues} from "@/lib/options";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {fields} from "@/lib/airtable";

interface ProjectDetailProps {
    record: Submission,
    handleSave: (evalNotes: string, evalStatus: string) => void
    handleSetEvaluator: (evaluator: string) => void
}

const ProjectSubmissionDetail = (
    {record, handleSave, handleSetEvaluator}: ProjectDetailProps
) => {
    const [evaluator, setEvaluator] = useState('')
    const [evalNotes, setEvalNotes] = useState('');
    const [statusOpen, setStatusOpen] = useState(false)
    const [evalStatus, setEvalStatus] = useState('')

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
                    onClick={()=>handleSetEvaluator(evaluator)}
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
            <Button onClick={()=>handleSave(evalNotes, evalStatus)}>Save</Button>
        </section>
        <Link href={"/"}>Back to List</Link>
    </div>

 }

 export default ProjectSubmissionDetail
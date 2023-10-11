'use client'

import {Submission} from "@/types/SoloProjectTypes";
import {roleColors} from "@/styles/roles";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {AtSign, Check, ChevronsUpDown, Copy, Github, PencilLine} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {evalStatusValues} from "@/lib/options";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {ActionResponse} from "@/types";
import {CopyToClipboard} from "react-copy-to-clipboard";

interface ProjectDetailProps {
    record: Submission,
    handleSave: (evalNotes: string, evalStatus: string) => Promise<ActionResponse>
    handleSetEvaluator: () => Promise<ActionResponse>
}

const ProjectSubmissionDetail = (
    {record, handleSave, handleSetEvaluator}: ProjectDetailProps
) => {
    const [evaluator, setEvaluator] = useState('')
    const [evalNotes, setEvalNotes] = useState('');
    const [statusOpen, setStatusOpen] = useState(false)
    const [evalStatus, setEvalStatus] = useState('')
    const [ringTheBellText, setRingTheBellText] = useState('')
    const [selectionLen, setSelectionLen] = useState(0)

    useEffect(() => {
        if (record) {
            setEvalNotes(record.fields['Evaluation Feedback']);
            setEvaluator(record.fields.Evaluator)
            setEvalStatus(record.fields["Evaluation Status"])
        }
    }, [record]);

    const handleSaveLocal = async () => {
        const res = await handleSave(evalNotes, evalStatus)
        if (res.success) {
            alert(`Saved. Status: ${res.data?.fields["Evaluation Status"]}`)
        }
    }

    const onPassSelect = () => {
        setRingTheBellText(`Congratulations @${record.fields["Discord Name"]} on successfully completing your Solo Project !!! :tada:`)
    }

    const onSelectText = () => {
        const selection = window.getSelection()?.toString()
        if(selection && selection !==''){
            setSelectionLen(selection.length)
        }else{
            setSelectionLen(0)
        }
    }

    const handleSetEvaluatorLocal = async () => {
        const res = await handleSetEvaluator()
        if (res.success) {
            setEvaluator(res.data?.fields.Evaluator as string)
            alert(`Evaluator set to ${res.data?.fields.Evaluator}`)
        }
    }

    return <div>
        <section className="flex flex-col gap-5 w-[90%] mx-auto">
            <header className="flex flex-col">
                <div className="flex flex-row items-center justify-center m-2">
                    <h1 className="text-2xl">
                        {record.fields["Discord Name"] ?? "Discord ID not Provided"}
                    </h1>
                    <CopyToClipboard text={record.fields["Discord Name"]}>
                        <Button variant="outline" size="icon" className="ml-2 h-8 w-8">
                            <Copy className="h-4 w-4"/>
                        </Button>
                    </CopyToClipboard>
                </div>
                {record.fields["Discord ID"] ?
                    <p className="flex">
                        <AtSign className="mr-2"/>{record.fields["Discord ID"]}
                        <CopyToClipboard text={`<@${record.fields["Discord ID"]}>`}>
                            <Button variant="outline" size="icon" className="ml-2 h-8 w-8">
                                <Copy className="h-4 w-4"/>
                            </Button>
                        </CopyToClipboard>
                    </p> :
                    null
                }
                {record.fields["GitHub ID"] ?
                    <p className="flex">
                        <Github className="mr-2"/>{record.fields["GitHub ID"]}
                    </p> :
                    null
                }

                {record.fields["Voyage Role (from Applications link)"] ?
                    <div
                        className={`text-center ${roleColors[record.fields["Voyage Role (from Applications link)"]].bg} py-1 mt-3`}>
                        {record.fields["Voyage Role (from Applications link)"]}
                    </div>:
                    <div className="text-center text-gray-800 bg-gray-300 py-1 mt-3">No Role Selected</div>
                }
            </header>

            <div>{record.fields["Timestamp"].toString()}</div>
            <div>{record.fields.Tier}</div>
            {record.fields["Instructions"] ?
                <div>
                    <div className="text-gray-500">Instructions:</div>
                    <div>{record.fields["Instructions"]} </div>
                </div>
                : null
            }
            {record.fields["Addl. Comments"] ?
                <div>
                    <div className="text-gray-500">Additional Comments:</div>
                    <div>{record.fields["Addl. Comments"]} </div>
                </div>
                : null
            }
            <table className="table-auto">
                <tbody>
                <tr>
                    <td>Deployed App URL:</td>
                    <td className="px-4 text-blue-500 hover:underline">
                        <Link
                            href={record.fields["Deployed App URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{record.fields["Deployed App URL"]}</Link>
                    </td>
                </tr>
                <tr>
                    <td>Github Repo URL:</td>
                    <td className="px-4 text-blue-500 hover:underline">
                        <Link
                            href={record.fields["GitHub Repo URL"]}
                            target="_blank"
                            rel="noopener noreferrer"
                        >{record.fields["GitHub Repo URL"]}</Link>
                    </td>
                </tr>

                <tr>
                    <td className="pt-4">Evaluator:</td>
                    <td className="px-4 pt-4">{evaluator}</td>
                </tr>
                </tbody>
            </table>
            <Button className="bg-green-700 light:text-white-200 hover:bg-green-900 disabled:bg-gray-500"
                    disabled={!!evaluator}
                    onClick={handleSetEvaluatorLocal}
            >
                <PencilLine className="mr-2 h-4 w-4"/>
                Evaluate This
            </Button>
            <Textarea
                className="h-[500px]"
                value={evalNotes}
                onChange={e => setEvalNotes(e.target.value)}
                onMouseUp={onSelectText}
            />
            <div className="text-right text-gray-500">
                {selectionLen}/{evalNotes?.length??'0'}
            </div>

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
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search status..."/>
                            <CommandEmpty>No status found.</CommandEmpty>
                            <CommandGroup>
                                {evalStatusValues.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        onSelect={(_) => {
                                            setEvalStatus(status.value)
                                            if(status.value==="Passed") {
                                                onPassSelect()
                                            }
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
            {evalStatus === "Passed"
                ? <div>
                    {ringTheBellText}
                    <CopyToClipboard text={ringTheBellText}>
                        <Button variant="outline" size="icon" className="ml-2 h-8 w-8">
                            <Copy className="h-4 w-4"/>
                        </Button>
                    </CopyToClipboard>
                </div>
                : null
            }
            <Button
                onClick={handleSaveLocal}
            >Save</Button>
        </section>
    </div>
}

export default ProjectSubmissionDetail
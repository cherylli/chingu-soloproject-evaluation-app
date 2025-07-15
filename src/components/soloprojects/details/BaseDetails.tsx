'use client'

import {FilteredFields, Submission, VoyageRole} from "@/types/SoloProjectTypes";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, Copy, PencilLine, XCircle} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {evalStatusValues} from "@/lib/options";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-hot-toast";
import {getRandomPassMessage} from "@/lib/getRandomPassMessage";
import {getRole} from "@/lib/getRole";
import DeveloperDetails from "@/components/soloprojects/details/Developer";
import SMDetails from "@/components/soloprojects/details/SMDetails";
import PODetails from "@/components/soloprojects/details/PODetails";
import UIUXDetails from "@/components/soloprojects/details/UIUXDetails";
import { BaseDetailHeader } from "@/components/soloprojects/details/BaseDetailsHeader";
import TierSuggestion from "@/components/soloprojects/tiers/TierSuggestion";
import {removeEvaluatorOnDb, setEvaluatorOnDb, updateSoloProjectById} from "@/services/soloProjects";

interface ProjectDetailProps {
    record: Submission
}

const ProjectSubmissionDetail = (
    {record: initialRecord}: ProjectDetailProps
) => {
    const [statusOpen, setStatusOpen] = useState(false)
    const [ringTheBellText, setRingTheBellText] = useState('')
    const [selectionLen, setSelectionLen] = useState(0)
    const [record, setRecord] = useState<Submission>(initialRecord)
    // TODO:
    //  [x] 1. update fields to use _record instead of record from props
    //  [x] 2. get rid of evaluator state and use _record.evaluator
    // 3. remove ___Local functions and just use the ones in service

    if(!record) return

    const handleSave = async () => {
        const savingToast = toast.loading('Saving...')
        const res = await updateSoloProjectById(record.id, {
            "Evaluation Feedback": record.fields["Evaluation Feedback"],
            "Evaluation Status": record.fields["Evaluation Status"]
        })
        if (res.success) {
            toast.success(`Saved. Status: ${res.data?.fields["Evaluation Status"]}`)
        } else {
            toast.error(`Error Saving: ${res.message}`)
        }
        toast.dismiss(savingToast)
    }

    const handleSetEvaluator = async () => {
        const setEvaluatorToast = toast.loading('Setting Evaluator...')
        const res = await setEvaluatorOnDb(record.id)
        if (res.success) {
            updateRecordFields('Evaluator', res.data?.fields.Evaluator as string)
            toast.success(`Evaluator set to ${res.data?.fields.Evaluator}`)
        } else {
            toast.error(`Set Evaluator FAILED: ${res.message}`)
        }
        toast.dismiss(setEvaluatorToast)
    }

    const handleRemoveEvaluator = async () => {
        const removeEvaluatorToast = toast.loading('Removing Evaluator...')
        const res = await removeEvaluatorOnDb(record.id)
        if (res.success) {
            updateRecordFields('Evaluator', '')
            toast.success('Removed Evaluator')
        } else {
            toast.error(`Remove evaluator FAILED: ${res.message}`)
        }
        toast.dismiss(removeEvaluatorToast)
    }

    const onPassSelect = () => {
        setRingTheBellText(getRandomPassMessage(record.fields["Discord Name"]))
    }

    const onSelectText = () => {
        const selection = window.getSelection()?.toString()
        if (selection && selection !== '') {
            setSelectionLen(selection.length)
        } else {
            setSelectionLen(0)
        }
    }

    const getRoleComponent = (role:VoyageRole) => {
        switch (role) {
            case "Software Developer":
            case "Developer":
                return <DeveloperDetails fields={record.fields} />
            case "Scrum Master":
                return <SMDetails fields={record.fields}/>
            case "Product Owner":
                return <PODetails fields={record.fields}/>
            case "UI/UX Designer":
            case "UI / UX Designer":
                return <UIUXDetails fields={record.fields} />
            case "Data Scientist":
                return <DeveloperDetails fields={record.fields} />
        }
    }

    const updateRecordFields = (field: keyof FilteredFields, value: string) => {
        setRecord({
            ...record,
            fields: {
                ...record.fields,
                [field]: value
            }
        })
    }

    return <div>
        <section className="flex flex-col gap-5 w-[90%] mx-auto">
            <BaseDetailHeader record={record} />
            <div>{record.fields["Timestamp"].toString()}</div>
            <div className="flex gap-5 items-center">
                <div>{record.fields.Tier}</div>
                <TierSuggestion onSuccess={updateRecordFields}/>
            </div>

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

            <div className="flex">
                <div className="mr-3">Evaluator:</div>
                <div>{record.fields.Evaluator}</div>
                {record.fields.Evaluator&&<XCircle color="#A30000" className="ml-2 cursor-pointer" onClick={handleRemoveEvaluator}/>}
            </div>


            <Button className="bg-green-700 light:text-white-200 hover:bg-green-900 disabled:bg-gray-500"
                    disabled={!!record.fields.Evaluator}
                    onClick={handleSetEvaluator}
            >
                <PencilLine className="mr-2 h-4 w-4"/>
                Evaluate This
            </Button>

            {
                getRoleComponent(getRole(record.fields))
            }

            <Textarea
                className="h-[500px]"
                value={record.fields["Evaluation Feedback"]}
                onChange={e => updateRecordFields('Evaluation Feedback', e.target.value)}
                onMouseUp={onSelectText}
            />
            <div className="text-right text-gray-500">
                {selectionLen}/{record.fields["Evaluation Feedback"]?.length ?? '0'}
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
                            {record.fields["Evaluation Status"]}
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
                                            updateRecordFields("Evaluation Status", status.value)
                                            if (status.value === "Passed") {
                                                onPassSelect()
                                            }
                                            setStatusOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                record.fields["Evaluation Status"] === status.value ? "opacity-100" : "opacity-0"
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
            {record.fields["Evaluation Status"] === "Passed"
                ? <div className="whitespace-pre-line">
                    {ringTheBellText}
                    <CopyToClipboard text={ringTheBellText}>
                        <Button
                            variant="outline"
                            size="icon"
                            className="ml-2 h-8 w-8"
                            onClick={() => toast('Copied!')}
                        >
                            <Copy className="h-4 w-4"/>
                        </Button>
                    </CopyToClipboard>
                </div>
                : null
            }
            <Button
                onClick={handleSave}
            >Save</Button>
        </section>
    </div>
}

export default ProjectSubmissionDetail
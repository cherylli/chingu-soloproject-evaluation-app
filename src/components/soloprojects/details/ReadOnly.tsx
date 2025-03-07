/*
    ReadOnly with basic info
    - for passed project but also allow change of status when they are accidentally set to passed
*/
'use client'

import {Submission} from "@/types/SoloProjectTypes";
import {Button} from "@/components/ui/button";
import {AtSign, Check, ChevronsUpDown, Copy, Github} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {evalStatusValues} from "@/lib/options";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";
import {ActionResponse} from "@/types";
import {toast} from "react-hot-toast";
import { BaseDetailHeader } from "@/components/soloprojects/details/BaseDetailsHeader";



interface ProjectDetailProps {
    record: Submission,
    handleStatusChange: (evalStatus: string) => Promise<ActionResponse>
}

const ReadOnlyDetails = (
    {record, handleStatusChange}: ProjectDetailProps
) => {
    const [evaluator, setEvaluator] = useState('')
    const [evalNotes, setEvalNotes] = useState('');
    const [statusOpen, setStatusOpen] = useState(false)
    const [evalStatus, setEvalStatus] = useState('')


    useEffect(() => {
        if (record) {
            setEvalNotes(record.fields['Evaluation Feedback']);
            setEvaluator(record.fields.Evaluator)
            setEvalStatus(record.fields["Evaluation Status"])
        }
    }, [record]);

    const handleStatusChangeLocal = async () => {
        const savingToast = toast.loading('Saving...')
        const res = await handleStatusChange(evalStatus)
        if (res.success) {
            toast.success(`Saved. Status: ${res.data?.fields["Evaluation Status"]}`)
        } else {
            toast.error(`Error Saving: ${res.message}`)
        }
        toast.dismiss(savingToast)
    }


    return <div>
        <section className="flex flex-col gap-5 w-[90%] mx-auto pb-20">
            <BaseDetailHeader record={record} />

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

            <div className="flex">
                <div className="mr-3">Evaluator:</div>
                <div>{evaluator}</div>
            </div>

            <Textarea
                readOnly
                className="h-[200px]"
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
            <Button
                onClick={handleStatusChangeLocal}
            >Save</Button>
        </section>
    </div>
}

export default ReadOnlyDetails


import {createColumnHelper} from "@tanstack/table-core";
import {Submission} from "@/types/SoloProjectTypes";
import Link from "next/link";
import {ExternalLink, LinkIcon} from "lucide-react";
import {SiGithub} from "@icons-pack/react-simple-icons";
import {Button} from "@/components/ui/button";
import SetTierBtn from "@/components/soloprojects/tiers/SetTierBtn";

const columnHelper = createColumnHelper<Submission>()

export const tierMismatchColumnDef = [
    columnHelper.accessor((row) => row.fields["Discord Name"], {
        header: "User",
        cell: ({getValue, row}) => {
            return <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                    <div className="cursor-pointer">
                        {/* TODO: Link to user */}
                        <div className="font-bold mr-6">{getValue()}</div>
                    </div>
                    <div className="text-gray-500">
                        <div>{row.original.fields["Evaluation Status"]}</div>
                        <div>{row.original.fields["Role"]}</div>
                    </div>
                </div>
            </div>

        }
    }),
    columnHelper.display({
        id: "Links",
        cell: ({row}) =>
            <div className="flex gap-2 items-center">
                <Link
                    href={`/solo-project/${row.original.id}`}
                    target="_blank"
                >
                    <ExternalLink/>
                </Link>
                <a
                    href={row.original.fields["GitHub Repo URL"]}
                    target="_blank"
                >
                    <SiGithub/>
                </a>
                <a
                    href={row.original.fields["Deployed App URL"]}
                    target="_blank"
                >
                    <LinkIcon/>
                </a>
            </div>
    }),
    columnHelper.accessor((row) => row.fields["Tier"], {
        id: "Tier",
        header: "Suggested Tier"
    }),
    columnHelper.display({
        id: "Action",
        header: "Action",
        cell: ({row}) => {
            return <SetTierBtn
                soloProjectId={row.original.id}
                tier={row.original.fields.Tier}
            >Accept</SetTierBtn>
        }
    }),
    columnHelper.display({
        id: "SetTier",
        header: "Set Tier",
        cell: ({row}) => {
            return <div className="flex gap-2">
                {[1, 2, 3].map(tier => <SetTierBtn
                    key={tier}
                    soloProjectId={row.original.id}
                    tier={tier.toString()}>{tier}</SetTierBtn>
                )}
            </div>
        }
    })

]
'use client'

import type {MemberDetails} from "@/types/MemberTypes";
import {useReactTable} from "@tanstack/react-table";
import {Submission} from "@/types/SoloProjectTypes";
import {getCoreRowModel} from "@tanstack/table-core";
import {spColDef} from "@/components/members/spColDef";
import StandardReactTable from "@/components/react-table/StandardReactTable";
import {Context} from "@/types";
import {Application} from "@/types/ApplicationTypes";
import {VoyageSignup} from "@/types/VoyageSignupTypes";
import {appColDef} from "@/components/members/appColDef";
import {vsColDef} from "@/components/members/vsColDef";

const MemberDetails = ({
    memberDetails,
    atBaseUrls
}: {
    memberDetails: MemberDetails,
    atBaseUrls: Partial<Record<Context, string>>
}) => {
    const appTable = useReactTable<Application>({
        data: memberDetails.applications,
        columns: appColDef(atBaseUrls["application"] ?? "#"),
        getCoreRowModel: getCoreRowModel<Application>()
    })
    const vsTable = useReactTable<VoyageSignup>({
        data: memberDetails.voyageSignups,
        columns: vsColDef(atBaseUrls["voyage-signup"] ?? "#"),
        getCoreRowModel: getCoreRowModel<VoyageSignup>()
    })
    const spTable = useReactTable<Submission>({
        data: memberDetails.soloProjects,
        columns: spColDef(atBaseUrls["solo-project"] ?? "#"),
        getCoreRowModel: getCoreRowModel<Submission>()
    })
    return (
        <div>
            <StandardReactTable table={spTable} />
            <StandardReactTable table={vsTable} />
            <StandardReactTable table={appTable} />
        </div>
    )
}

export default MemberDetails
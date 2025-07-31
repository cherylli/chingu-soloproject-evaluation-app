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
import H1 from "@/components/ui/typography/h1";

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
            <H1>Voyage Signups</H1>
            <StandardReactTable table={vsTable} />
            <H1>Solo Projects</H1>
            <StandardReactTable table={spTable} />
            <H1>Applications</H1>
            <StandardReactTable table={appTable} />
        </div>
    )
}

export default MemberDetails
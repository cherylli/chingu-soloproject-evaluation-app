// since application form is detached from solo project form now, there's a new "Role" column

import {FilteredFields} from "@/types/SoloProjectTypes";
import {parseRole} from "@/lib/parseRole";

export const getRole = (fields: FilteredFields) => {
    return fields["Role"] || parseRole(fields["Voyage Role (from Applications link)"])
}
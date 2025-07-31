import {Row} from "@tanstack/table-core";
import {AirtableData} from "@/types";
import {SiAirtable} from "@icons-pack/react-simple-icons";

const AirtableLinkCell = <T extends AirtableData> (
    {row, baseUrl}: {
        row: Row<T>
        baseUrl: string
    }
) => {
    return(
        <div>
            <a href={`${baseUrl}/${row.original.id}`} target="_blank" rel="noreferrer" >
                <SiAirtable/>
            </a>
        </div>
    )
 }
 
 export default AirtableLinkCell
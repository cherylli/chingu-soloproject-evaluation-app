import {Submission} from "@/types/SoloProjectTypes";

const ProductOwnerDetails = ({fields}: Submission) => {
    return(
        <div>
            <div>PO1</div>
            <div>{fields["PO: Certification"]}</div>
        </div>
    )
 }
 
 export default ProductOwnerDetails
import {ReactNode} from "react";

const H1 = ({children}: { children: ReactNode}) => {
    return <h1
        className="scroll-m-20 text-center text-2xl font-extrabold tracking-tight text-balance mt-8 mb-12"
    >{children}</h1>
 }

 export default H1
import { Skeleton } from "@/components/ui/skeleton";

const NavSkeleton = () => {
    return(
            <div className="flex justify-between items-center p-2 h-[90px]">
                <div className="flex flex-row items-center gap-5">
                    <Skeleton className="w-[25px] h-[30px]"/>
                    <Skeleton className="w-[80px] h-[30px]"/>
                </div>
                <div className="flex items-center gap-1">
                    <Skeleton className="w-[50px] h-[50px]"/>
                    <Skeleton className="w-[270px] h-[50px]"/>
                </div>
            </div>
    )
 }
 
 export default NavSkeleton
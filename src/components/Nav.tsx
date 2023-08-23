'use client'
import { ModeToggle } from "@/components/ModeToggle";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {Home} from "lucide-react";

const Nav = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/')
        }
    })

    return(
        <div className="flex justify-between">
            <Link href={'/'}>
                <Home/>
            </Link>
            <ModeToggle/>
            {session?.user
                ?<div className="flex items-center">
                    <div>{session?.user?.evaluatorEmail}</div>
                    <Image src={session?.user?.image!} height={25} width={25} alt="avatar"/>
                    <Link href={'/api/auth/signout?callbackUrl=/'}>Sign Out</Link>
                </div>
                :null
            }
        </div>
    )
 }

 export default Nav
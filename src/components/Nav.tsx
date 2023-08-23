'use client'
import { ModeToggle } from "@/components/ModeToggle";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {Home} from "lucide-react";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Nav = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/')
        }
    })

    return(
        <div className="flex justify-between items-center p-2">
            <Link href={'/'}>
                <Home/>
            </Link>
            {session?.user
                ?<div className="flex items-center">
                    <ModeToggle/>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <div className="flex items-center">
                                        <Image
                                            className="mr-2"
                                            src={session?.user?.image!} height={40} width={40} alt="avatar"
                                        />
                                        <div className="flex flex-col items-start">
                                            <div>{session?.user?.name}</div>
                                            <div>{session?.user?.evaluatorEmail}</div>
                                        </div>
                                    </div>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        <Link href={'/api/auth/signout?callbackUrl=/'}>Sign Out</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                :null
            }
        </div>
    )
 }

 export default Nav
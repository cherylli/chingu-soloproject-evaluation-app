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
import {
    Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger
} from "@/components/ui/menubar"


const Nav = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/')
        }
    })

    return(
        <div className="flex justify-between items-center p-2 h-[90px]">
            <div className="flex flex-row items-center gap-5">
                <a href={'/'}>
                    <Home/>
                </a>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>Status</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                <Link href={'/status/waiting-eval'}>Waiting Eval</Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={'/status/not-in-discord'}>Not In Discord</Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={'/status/requested-changes'}>Requested Changes</Link>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Feedback</MenubarTrigger>
                        <MenubarContent>
                            <MenubarCheckboxItem
                                checked
                                onClick={()=>console.log("show")}>
                                Show
                            </MenubarCheckboxItem>
                            <MenubarCheckboxItem>
                                Hide
                            </MenubarCheckboxItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
            {session?.user
                ?<div className="flex items-center gap-1">
                    <ModeToggle/>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <div className="flex pt-2">
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
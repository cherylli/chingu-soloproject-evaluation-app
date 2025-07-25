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
    Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger
} from "@/components/ui/menubar"
import NavSkeleton from "@/components/skeletons/nav-skeleton";


const Nav = () => {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/')
        }
    })

    if (status === "loading") {
        return <NavSkeleton />
    }

    return <div className="flex justify-between items-center p-2 h-[90px]">
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
                            <MenubarItem>
                                <Link href={'/status/passed'}>Passed</Link>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    {session?.user.roles.includes("admin") &&
                        <MenubarMenu>
                            <MenubarTrigger>Admin</MenubarTrigger>
                            <MenubarContent>
                                <MenubarSub>
                                    <MenubarSubTrigger>Solo Project</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>
                                            <Link href={'/admin/solo-project/tier-mismatch'}>Tier Mismatch</Link>
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSub>
                                    <MenubarSubTrigger>Voyage</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>
                                            <Link href={'/admin/voyage/schedule'}>Schedule</Link>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <Link href={'/admin/check-in'}>Check-ins</Link>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <Link href={'/admin/voyage/signups'}>Latest Signups</Link>
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSub>
                                    <MenubarSubTrigger>Member</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>
                                            <Link href={'/admin/member/search'}>Search</Link>
                                        </MenubarItem>
                                        <MenubarItem>
                                            <Link href={'/admin/member/'}>Latest Applications</Link>
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>
                    }
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
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
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
 }

 export default Nav
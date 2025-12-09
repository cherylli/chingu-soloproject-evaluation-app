'use client';
import { ModeToggle } from '@/components/ModeToggle';
import NavSkeleton from '@/components/skeletons/nav-skeleton';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { Home } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Nav = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    },
  });

  const { isAdmin } = useRoleCheck();

  if (status === 'loading') {
    return <NavSkeleton />;
  }

  const statusMenuComponents: {
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      title: 'Waiting Eval',
      href: '/status/waiting-eval',
      description: 'Projects awaiting evaluation',
    },
    {
      title: 'Not in Discord',
      href: '/status/not-in-discord',
      description:
        'Members who have not joined Chingu discord server',
    },
    {
      title: 'Requested Changes',
      href: '/status/requested-changes',
      description:
        'We have requested changes for these projects, and still waiting for member responses',
    },
    {
      title: 'Passed',
      href: '/status/passed',
      description: 'Projects that have passed evaluation',
    },
  ];

  const adminMenuComponents = [
    {
      title: 'Solo Project',
      subMenu: [
        {
          title: 'Tier Mismatch',
          href: '/admin/solo-project/tier-mismatch',
        },
      ],
    },
    {
      title: 'Voyage',
      subMenu: [
        {
          title: 'Schedule',
          href: '/admin/voyage/schedule',
        },
        {
          title: 'Check-ins',
          href: '/admin/check-in',
        },
        {
          title: 'Latest Signups',
          href: '/admin/voyage/signups',
        },
      ],
    },
    {
      title: 'Member',
      subMenu: [
        {
          title: 'Search',
          href: '/admin/member/search',
        },
        {
          title: 'Latest Applications',
          href: '/admin/member/',
        },
      ],
    },
  ];

  const resourceMenuComponents = [
    {
      title: 'Links',
      href: '/resources/links',
      description: 'Useful links',
    },
    {
      title: 'Feedback',
      href: '/feedback',
      description: 'Solo project feedback',
    },
  ];

  function ListItem({
    title,
    children,
    href,
    ...props
  }: React.ComponentPropsWithoutRef<'li'> & {
    href: string;
  }) {
    return (
      <li {...props}>
        <NavigationMenuLink asChild>
          <Link href={href}>
            <div className="text-sm leading-none font-medium">
              {title}
            </div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <div className="flex justify-between items-center h-[90px] mx-5">
      <div className="flex flex-row items-center gap-5">
        <a href={'/'}>
          <Home />
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            {/* Status menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Status
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {statusMenuComponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* Admin menu */}
            {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Admin
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-3 lg:w-[600px]">
                    {adminMenuComponents.map(
                      (component) => (
                        <ul key={component.title}>
                          <div className="text-gray-500 mb-2">
                            {component.title}
                          </div>
                          {component.subMenu.map(
                            (subComponent) => (
                              <ListItem
                                key={subComponent.title}
                                title={subComponent.title}
                                href={subComponent.href}
                              />
                            )
                          )}
                        </ul>
                      )
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            {/* Resources menu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Status
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {resourceMenuComponents.map(
                    (component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    )
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {session?.user ? (
        <div className="flex items-center gap-1">
          <ModeToggle />
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="flex pt-2">
                    <Image
                      className="mr-2"
                      src={session?.user?.image!}
                      height={40}
                      width={40}
                      alt="avatar"
                    />
                    <div className="flex flex-col items-start">
                      <div>{session?.user?.name}</div>
                      <div>
                        {session?.user?.evaluatorEmail}
                      </div>
                    </div>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      href={
                        '/api/auth/signout?callbackUrl=/'
                      }
                    >
                      Sign Out
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      ) : null}
    </div>
  );
};

export default Nav;

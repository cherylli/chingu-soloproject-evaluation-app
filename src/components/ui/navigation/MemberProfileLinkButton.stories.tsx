import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import '../../../app/globals.css';
import * as MemberProfileLinkButtonModule from './MemberProfileLinkButton';

// Support both default and named exports
const MemberProfileLinkButtonComponent =
  (MemberProfileLinkButtonModule as any).default ??
  (MemberProfileLinkButtonModule as any)
    .MemberProfileLinkButton ??
  (MemberProfileLinkButtonModule as any)
    .MemberProfileButton;

type MemberProfileLinkButtonType =
  typeof MemberProfileLinkButtonComponent;

const meta: Meta<MemberProfileLinkButtonType> = {
  title: 'UI/Navigation/MemberProfileLinkButton',
  component: MemberProfileLinkButtonComponent as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon button that links to an admin-only member profile page. It is only visible to admins (determined by next-auth session roles). Stories wrap the component in a SessionProvider with an admin session so it renders in Storybook.',
      },
    },
  },
  argTypes: {
    discordId: {
      control: 'text',
      description:
        'Discord user ID used to build the admin profile link',
    },
  },
};

export default meta;

type Story = StoryObj<MemberProfileLinkButtonType>;

// Decorator to provide an admin session so the button renders
const withAdminSession = (StoryFn: React.FC) => (
  <SessionProvider
    session={{
      user: {
        name: 'Admin User',
        email: 'admin@example.com',
        // The project hook checks this field for role membership
        roles: ['admin'],
      } as any,
      // Far-future expiry so it is always treated as active
      expires: '2999-12-31T23:59:59.999Z',
    }}
  >
    <StoryFn />
  </SessionProvider>
);

export const Basic: Story = {
  name: 'Basic (Admin visible)',
  decorators: [withAdminSession],
  args: {
    discordId: '123456789012345678',
  },
};

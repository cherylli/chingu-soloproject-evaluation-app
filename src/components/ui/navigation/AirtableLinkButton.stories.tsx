import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import '../../../app/globals.css';
import * as AirtableLinkButtonModule from './AirtableLinkButton';

// Support both default and named exports
const AirtableLinkButtonComponent =
  (AirtableLinkButtonModule as any).default ??
  (AirtableLinkButtonModule as any).AirtableLinkButton;

type AirtableLinkButtonType =
  typeof AirtableLinkButtonComponent;

const meta: Meta<AirtableLinkButtonType> = {
  title: 'UI/Navigation/AirtableLinkButton',
  component: AirtableLinkButtonComponent as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button that links to an Airtable resource. It is only visible to admins (determined by next-auth session roles). Stories wrap the component in a SessionProvider with an admin session so it renders in Storybook.',
      },
    },
  },
  argTypes: {
    path: {
      control: 'text',
      description:
        'External URL to the Airtable base/view/table',
    },
    label: {
      control: 'text',
      description:
        'Text label displayed next to the Airtable icon',
    },
  },
};

export default meta;

type Story = StoryObj<AirtableLinkButtonType>;

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
    path: 'https://airtable.com/',
    label: 'Open in Airtable',
  },
};

export const WithCustomLabel: Story = {
  name: 'Custom Label',
  decorators: [withAdminSession],
  args: {
    path: 'https://airtable.com/shr1234567890abcd',
    label: 'View Signups Table',
  },
};

import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import {
  ExternalLink,
  Github,
  Link2,
  Mail,
} from 'lucide-react';
import '../../../app/globals.css';
import * as Module from './LinkButton';

const Component =
  (Module as any).default ?? (Module as any).LinkButton;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Buttons/LinkButton',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Base Link button which doesn't verify external links with zod. Use for internal links or links with no validation requirement.",
      },
    },
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'The destination URL',
    },
    text: {
      control: 'text',
      description:
        'Optional text label to render next to the icon',
    },
    Icon: {
      options: ['ExternalLink', 'Github', 'Link2', 'Mail'],
      mapping: {
        ExternalLink,
        Github,
        Link2,
        Mail,
      },
      control: {
        type: 'select',
        labels: {
          ExternalLink: 'External Link',
          Github: 'GitHub',
          Link2: 'Link',
          Mail: 'Mail',
        },
      },
      description:
        'Icon component to render inside the button',
    },
    tooltip: {
      control: 'text',
      description: 'Optional tooltip text to show on hover',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    url: 'https://chingu.io',
  } as any,
};

export const WithIcon: Story = {
  args: {
    url: 'https://github.com',
    Icon: 'Github',
  } as any,
};

export const WithText: Story = {
  args: {
    url: 'https://chingu.io',
    text: 'Visit Chingu',
  } as any,
};

export const Full: Story = {
  args: {
    url: 'mailto:admin@chingu.io',
    Icon: 'Mail',
    text: 'Contact Us',
    tooltip: 'Send an email to admin@chingu.io',
  } as any,
};

export const InternalLink: Story = {
  args: {
    url: '/dashboard',
    text: 'Go to Dashboard',
    Icon: 'Link2',
  } as any,
};

import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import { ExternalLink, Github, Link2 } from 'lucide-react';
import '../../../app/globals.css';
import * as Module from './ExternalLinkButton';

// Support default and named exports
const Component =
  (Module as any).default ??
  (Module as any).ExternalLinkButton;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Buttons/ExternalLinkButton',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A button that opens the provided URL in a new tab using a secure external link (noopener, noreferrer). Optionally renders a custom icon and/or text.',
      },
    },
  },
  argTypes: {
    url: {
      control: 'text',
      description:
        'The destination URL to open in a new browser tab',
    },
    text: {
      control: 'text',
      description:
        'Optional text label to render next to the icon',
    },
    Icon: {
      options: ['ExternalLink', 'Github', 'Link2'],
      mapping: {
        ExternalLink,
        Github,
        Link2,
      },
      control: {
        type: 'select',
        labels: {
          ExternalLink: 'External Link',
          Github: 'GitHub',
          Link2: 'Link',
        },
      },
      description:
        'Icon component to render inside the button',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const IconOnly: Story = {
  args: {
    url: 'https://example.com',
    Icon: 'ExternalLink',
  } as any,
};

export const WithText: Story = {
  args: {
    url: 'https://example.com',
    Icon: 'ExternalLink',
    text: 'Open link',
  } as any,
};

export const WithCustomIcon: Story = {
  args: {
    url: 'https://github.com',
    Icon: 'Github',
    text: 'GitHub',
  } as any,
};

export const LongUrl: Story = {
  args: {
    url: 'https://example.com/some/very/long/path?with=query&and=params#section',
    Icon: 'Link2',
  } as any,
};

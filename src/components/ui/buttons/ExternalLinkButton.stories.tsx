import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './ExternalLinkButton';

// Support both named and default exports for ExternalLinkButton
const Component =
  (Module as any).ExternalLinkButton ??
  (Module as any).default;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Buttons/ExternalLinkButton',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An icon button that opens the provided URL in a new tab using a secure external link (noopener, noreferrer).',
      },
    },
  },
  argTypes: {
    url: {
      control: 'text',
      description:
        'The destination URL to open in a new browser tab',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Basic: Story = {
  args: {
    url: 'https://example.com',
  },
};

export const LongUrl: Story = {
  args: {
    url: 'https://example.com/some/very/long/path?with=query&and=params#section',
  },
};

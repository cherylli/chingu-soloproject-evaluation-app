import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './ErrorMsg';

const Component =
  (Module as any).default ?? (Module as any).ErrorMsg;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/States/ErrorMsg',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays an error message inside a card with an optional action button.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Message shown to the user',
    },
    actionButton: {
      control: 'object',
      description:
        'Optional action button with link and label',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    message: 'Something went wrong while fetching data.',
  },
};

export const WithActionButton: Story = {
  args: {
    message: 'Failed to load resource.',
    actionButton: {
      link: '#',
      label: 'Try Again',
    },
  },
};

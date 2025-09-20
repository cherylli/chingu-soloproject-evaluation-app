import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './NoRecordFound';

const Component =
  (Module as any).default ?? (Module as any).NoRecordFound;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/States/NoRecordFound',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays a friendly message when no records are found, with an optional action button to guide users.',
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
    message: 'No record found',
  },
};

export const WithActionButton: Story = {
  args: {
    message: 'No results. Create a new one to get started.',
    actionButton: {
      link: '#',
      label: 'Create New',
    },
  },
};

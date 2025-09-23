import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './CopyButton';

const Component =
  (Module as any).CopyButton ?? (Module as any).default;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Buttons/CopyButton',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An icon button that copies the provided text to the clipboard and shows a toast notification on click.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description:
        'The text value to copy to the clipboard when clicked',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Basic: Story = {
  args: {
    text: 'Hello, world!',
  },
};

export const LongText: Story = {
  args: {
    text: 'https://example.com/some/long/path?with=query&and=params',
  },
};

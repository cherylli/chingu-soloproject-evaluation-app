import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './h1';

const Component =
  (Module as any).default ?? (Module as any).H1;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Typography/H1',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Styled H1 component for page titles.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Heading text content',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    children: 'This is a Page Title',
  },
};

import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './p';

const Component =
  (Module as any).default ?? (Module as any).P;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Typography/P',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Styled paragraph component for body text.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Paragraph text content',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    children:
      'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.',
  },
};

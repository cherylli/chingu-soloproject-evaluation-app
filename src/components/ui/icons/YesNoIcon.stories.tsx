import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as Module from './YesNoIcon';

const Component =
  (Module as any).YesNoIcon ?? (Module as any).default;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Icons/YesNoIcon',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Renders a colored icon based on a yes/no/other string. Yes -> green check, No -> red X, other -> yellow help.',
      },
    },
  },
  argTypes: {
    answer: {
      control: 'text',
      description:
        'Input string used to decide which icon to render',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Yes: Story = {
  args: { answer: 'yes' },
};

export const No: Story = {
  args: { answer: 'no' },
};

export const Unknown: Story = {
  name: 'Other/Unknown',
  args: { answer: 'maybe' },
};

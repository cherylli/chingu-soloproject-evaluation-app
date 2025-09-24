import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import { Edit, Info, Trash2 } from 'lucide-react';
import '../../../app/globals.css';
import * as Module from './ButtonIconWithAction';

// Support default export
const Component =
  (Module as any).default ??
  (Module as any).ButtonIconWithAction;

type T = typeof Component;

const meta: Meta<T> = {
  title: 'UI/Buttons/ButtonIconWithAction',
  component: Component as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A small outline icon button that triggers an action on click. Optionally shows a tooltip on hover.',
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    tooltip: {
      control: 'text',
      description: 'Optional tooltip text shown on hover',
    },
    className: {
      control: 'text',
      description:
        'Additional CSS classes to apply to the button',
    },
    Icon: {
      options: ['Edit', 'Info', 'Trash2'],
      mapping: {
        Edit,
        Info,
        Trash2,
      },
      control: {
        type: 'select',
        labels: {
          Edit: 'Edit',
          Info: 'Info',
          Trash2: 'Trash',
        },
      },
      description:
        'Icon component to render inside the button',
    },
  },
};

export default meta;

type Story = StoryObj<T>;

export const Basic: Story = {
  args: {
    Icon: 'Edit',
    tooltip: 'Edit item',
  } as any,
};

export const NoTooltip: Story = {
  args: {
    Icon: 'Info',
  } as any,
};

export const DangerAction: Story = {
  args: {
    Icon: 'Trash2',
    tooltip: 'Delete item',
    className: 'text-red-500 hover:text-red-600',
  } as any,
};

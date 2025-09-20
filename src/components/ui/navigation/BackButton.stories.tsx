import type {
  Meta,
  StoryObj,
} from '@storybook/nextjs-vite';
import '../../../app/globals.css';
import * as BackButtonModule from './BackButton';

// Support both named and default exports for BackButton
const BackButtonComponent =
  // @ts-expect-error allow fallback to either export style
  (BackButtonModule as any).BackButton ??
  (BackButtonModule as any).default;

type BackButtonType = typeof BackButtonComponent;

const meta: Meta<BackButtonType> = {
  title: 'UI/Navigation/BackButton',
  component: BackButtonComponent as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A simple navigation button that routes the user back to a given path using Next.js Link and a link-styled Button.',
      },
    },
  },
  argTypes: {
    path: {
      control: 'text',
      description: 'Destination path for the Back button',
    },
    label: {
      control: 'text',
      description:
        'Text label displayed next to the back arrow',
    },
  },
};

export default meta;

type Story = StoryObj<BackButtonType>;

export const Basic: Story = {
  args: {
    path: '/',
    label: 'Back',
  },
};

export const ToMembersPage: Story = {
  name: 'To Members Page',
  args: {
    path: '/members',
    label: 'Back to Members',
  },
};

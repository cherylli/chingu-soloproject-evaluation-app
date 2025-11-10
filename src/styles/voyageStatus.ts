export const voyageStatusColors: Record<
  string,
  {
    text?: string;
    bg?: string;
  }
> = {
  Dropped: {
    text: 'text-gray-500',
  },
  Inactive: {
    text: 'dark:text-amber-200 text-amber-600',
  },
};

export const rowClassByStatus = (status: string) =>
  voyageStatusColors[status]?.text || '';

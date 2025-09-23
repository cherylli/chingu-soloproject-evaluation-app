'use client';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const CopyButton = ({ text = '' }: { text: string }) => {
  return (
    <CopyToClipboard text={text}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        onClick={() => toast('Copied!')}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </CopyToClipboard>
  );
};

export default CopyButton;

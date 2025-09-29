import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { sendDiscordDM } from '@/services/discord';
import {
  CheckCircleIcon,
  CircleXIcon,
  RefreshCcw,
  SendHorizontal,
  SendIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const N8NWebhookResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      id: z.string(),
      author: z.string(),
      timestamp: z.string(),
      workflowName: z.string(),
      chunks: z.array(
        z.object({
          chunkNumber: z.number(),
          chunkLength: z.number(),
          chunkContent: z.string(),
        })
      ),
    })
    .optional(),
});

type N8NWebhookResponse = z.infer<
  typeof N8NWebhookResponseSchema
>;

const WebhookResponseCard = ({
  res,
}: {
  res?: N8NWebhookResponse;
}) => {
  if (!res) {
    return (
      <Card className="max-w-[90%] mx-auto p-4">
        No response
      </Card>
    );
  }
  return (
    <Card className="max-w-[90%] mx-auto p-4">
      <CardHeader className="p-0 mb-5">
        <CardTitle className="flex items-center gap-2">
          {res.success ? (
            <>
              <CheckCircleIcon className="text-green-700" />
              <h3 className="text-sm">
                Message Sent Successful
              </h3>
            </>
          ) : (
            <>
              <CircleXIcon className="text-red-700" />
              Failed to Send Message
            </>
          )}
        </CardTitle>
      </CardHeader>
      {res.success ? (
        <>
          Author: {res.data?.author}
          <br />
          Timestamp: {res.data?.timestamp}
          <br />
          Workflow Name: {res.data?.workflowName}
          <br />
          Transaction ID: {res.data?.id}
          <br />
          <br />
          Chunks:
          <ul>
            {res.data?.chunks.map((c, i) => (
              <li key={i}>
                [{c.chunkLength}] {c.chunkContent}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <></>
      )}
      <CardContent></CardContent>
    </Card>
  );
};

const DiscordDMSheet = ({
  discordId,
}: {
  discordId: string;
}) => {
  const [message, setMessage] = useState<string>('');
  //const [showTextarea, setShowTextarea] =
  //  useState<boolean>(true);
  const [status, setStatus] = useState<Status>('error');
  const [resData, setResData] =
    useState<N8NWebhookResponse>();

  const isResetable =
    status === 'sent' || status === 'error';

  const handleSendDiscordDM = async () => {
    if (!message) {
      toast.error('Please enter a message');
      return;
    }
    try {
      setStatus('sending');
      const res = await sendDiscordDM(
        '139615488295698432',
        message
      );
      const parsedRes =
        N8NWebhookResponseSchema.safeParse(res);

      if (!parsedRes.success) {
        console.error(
          '[Discord DM] Invalid webhook response'
        );
        throw new Error(
          `[Discord DM] Invalid webhook response: ${z.treeifyError(parsedRes.error)}`
        );
      }

      setResData(parsedRes.data);
      if (parsedRes.data.success) {
        setStatus('sent');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
      throw error;
    }
  };

  const handleReset = () => {
    setResData(undefined);
    setStatus('idle');
    setMessage('');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-5 ml-[5%]">
          <SendHorizontal />
          Send DM
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Send DM on Discord</SheetTitle>
          <SheetDescription>
            Paste your message here to send to the user via
            DM from Titan. <br /> <br />
            Recipient discord id: {discordId}.
          </SheetDescription>
        </SheetHeader>
        {status === 'idle' || status === 'sending' ? (
          <Textarea
            className="w-[90%] mx-auto h-[60%]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : status === 'sent' ? (
          <WebhookResponseCard res={resData} />
        ) : (
          <WebhookResponseCard res={resData} />
        )}

        <SheetFooter>
          {isResetable ? (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleReset}
              disabled={!isResetable}
            >
              <RefreshCcw /> Send Another Message
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={status !== 'idle'}
                >
                  <SendIcon /> Send
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Send DM to Member?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSendDiscordDM}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DiscordDMSheet;

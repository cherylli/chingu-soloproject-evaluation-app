'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import {
  FeedbackCategory as FeedbackCategoryType,
  FeedbackContent,
} from '@/types/FeedbackType';
import { ChevronUp, Copy } from 'lucide-react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

const formatContent = (content: string) => {
  return content.replaceAll('<br/>', '\n');
};

const FeedbackItem = ({
  content,
  discordId,
}: {
  content: FeedbackContent;
  discordId: string;
}) => {
  const fbCellContent = discordId
    ? formatContent(content.feedback).replace(
        /\s@\s/g,
        ` <@${discordId}> `
      )
    : formatContent(content.feedback);
  return (
    <TableBody>
      <TableRow>
        <TableCell className="text-gray-500">
          {content.condition}
        </TableCell>
        {content.importance ? (
          <TableCell>{content.importance}</TableCell>
        ) : null}
        <TableCell>
          <CopyToClipboard text={fbCellContent}>
            <Button
              variant="outline"
              size="icon"
              className="ml-2 h-8 w-8"
              onClick={() => toast('Copied!')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CopyToClipboard>
        </TableCell>
        <TableCell className="whitespace-pre-wrap">
          {fbCellContent}
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

const FeedbackCategory = ({
  category,
  discordId,
}: {
  category: FeedbackCategoryType;
  discordId: string;
}) => {
  return (
    <div>
      <h1 className="text-xl m-4 text-orange-500">
        {category.name}
      </h1>
      <Table>
        {category.content.map((c, i) => (
          <FeedbackItem
            key={`${category.name}-${i}`}
            content={c}
            discordId={discordId}
          />
        ))}
      </Table>
    </div>
  );
};

const GithubFeedback = ({
  discordId,
  categories,
}: {
  discordId: string;
  categories: FeedbackCategoryType[];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFeedback = (): FeedbackCategoryType[] => {
    const feedbackArray = [] as FeedbackCategoryType[];
    for (const category of categories) {
      const filteredContent = category.content.filter(
        (item) =>
          item.feedback
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.condition
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      if (filteredContent.length > 0) {
        feedbackArray.push({
          name: category.name,
          content: filteredContent.map((item) => ({
            condition: item.condition,
            importance: item?.importance,
            feedback: item.feedback,
          })),
        });
      }
    }
    return feedbackArray;
  };

  return (
    <div id="feedbackDiv">
      <a
        href="#feedbackDiv"
        className="flex flex-col items-center fixed bottom-4 left-4 rounded-lg p-2 text-xl bg-yellow-700 bg-opacity-25 border-yellow-700 border-2 z-10"
        onClick={() => window.scrollTo(0, 0)}
      >
        <p>top</p>
        <ChevronUp />
      </a>

      <Input
        type="search"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="sticky top-0 text-2xl z-10"
      />
      <section>
        {filteredFeedback().map((c) => (
          <FeedbackCategory
            key={c.name}
            category={c}
            discordId={discordId}
          />
        ))}
      </section>
    </div>
  );
};

export default GithubFeedback;

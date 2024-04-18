'use client'
import {Input} from "@/components/ui/input";
import {FeedbackCategory as FeedbackCategoryType, FeedbackContent} from "@/types/FeedbackType";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {useState} from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {Button} from "@/components/ui/button";
import {ChevronUp, Copy} from "lucide-react";
import {toast} from "react-hot-toast";

const formatContent = (content: string) => {
    return content.replaceAll('<br/>', '\n')
}

const FeedbackItem = ({content, discordName}: {
    content: FeedbackContent,
    discordName: string
}) => {
    const fbCellContent = discordName ?
        formatContent(content.feedback).replace(/\s@\s/g, ` @${discordName} `) :
        formatContent(content.feedback)
    return <TableBody>
        <TableRow>
            <TableCell className="text-gray-500">{content.condition}</TableCell>
            {content.importance ? <TableCell>{content.importance}</TableCell> : null}
            <TableCell>
                <CopyToClipboard text={fbCellContent}>
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-2 h-8 w-8"
                        onClick={() => toast('Copied!')}
                    >
                        <Copy className="h-4 w-4"/>
                    </Button>
                </CopyToClipboard>
            </TableCell>
            <TableCell className="whitespace-pre-wrap">
                {fbCellContent}
            </TableCell>
        </TableRow>
    </TableBody>
}

const FeedbackCategory = ({category, discordName}: {
    category: FeedbackCategoryType,
    discordName: string
}) => {
    return <div>
        <h1 className="text-xl m-4 text-orange-500">{category.name}</h1>
        <Table>
            {category.content.map((c, i) => (
                <FeedbackItem
                    key={`${category.name}-${i}`}
                    content={c}
                    discordName={discordName}
                />
            ))}
        </Table>
    </div>
}

const GithubFeedback = (
    {discordName, categories}: { discordName: string, categories: FeedbackCategoryType[] }
) => {
    const [searchTerm, setSearchTerm] = useState('')
    const filteredFeedback = (): FeedbackCategoryType[] => {
        const feedbackArray = [] as FeedbackCategoryType[]
        for (const category of categories) {
            const filteredContent = category.content
                .filter(item => item.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    category.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (filteredContent.length > 0) {
                feedbackArray.push({
                    name: category.name,
                    content: filteredContent.map(item => ({
                        condition: item.condition,
                        importance: item?.importance,
                        feedback: item.feedback
                    }))
                });
            }
        }
        return feedbackArray
    }

    return (
        <div id="feedbackDiv">
            <a href="#feedbackDiv"
               className="flex flex-col items-center fixed bottom-4 left-4 rounded-lg p-2 text-xl bg-yellow-700 bg-opacity-25 border-yellow-700 border-2"
            >
                <p>top</p>
                <ChevronUp/>
            </a>

            <Input
                type="search"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sticky top-0 text-2xl"
            />
            <section>
                {filteredFeedback().map(c => (
                    <FeedbackCategory
                        key={c.name}
                        category={c}
                        discordName={discordName}
                    />
                ))}
            </section>

        </div>
    )
}

export default GithubFeedback
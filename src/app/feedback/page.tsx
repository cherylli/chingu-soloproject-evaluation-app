'use client'
import feedbackData from '@/data/githubFeedback.json'
import {Input} from "@/components/ui/input";
import {FeedbackCategory as FeedbackCategoryType, FeedbackContent} from "@/types/FeedbackType";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {useState} from "react";

const formatContent = (content:string) => {
    return content.replaceAll('<br/>','\n')
}

// TODO: replace @ with feedback username

const FeedbackItem = ({content}: { content: FeedbackContent }) => {
    return <TableBody>
        <TableRow>
            <TableCell className="text-gray-500">{content.condition}</TableCell>
            {content.importance ? <TableCell>{content.importance}</TableCell> : null}
            <TableCell className="whitespace-pre-wrap">
                {formatContent(content.feedback)}
            </TableCell>
        </TableRow>
    </TableBody>
}

const FeedbackCategory = ({category}: { category: FeedbackCategoryType }) => {
    return <div>
        <h1 className="text-xl m-4 text-orange-500">{category.name}</h1>
        <Table>
            {category.content.map((c, i) => (
                <FeedbackItem
                    key={`${category.name}-${i}`}
                    content={c}
                />
            ))}
        </Table>
    </div>
}

const GithubFeedback = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredFeedback = () : FeedbackCategoryType[]=> {
        const feedbackArray = [] as FeedbackCategoryType[]
        for (const category of feedbackData.categories) {
            const filteredContent = category.content
                .filter(item => item.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.condition.toLowerCase().includes(searchTerm.toLowerCase()));
            if (filteredContent.length > 0) {
                feedbackArray.push({
                    name: category.name,
                    content: filteredContent.map(item => ({
                        condition: item.condition,
                        feedback: item.feedback
                    }))
                });
            }
        }
        return feedbackArray
    }

    return (
        <div>
            <Input
                type="search"
                placeholder="Search"
                onChange={(e)=>setSearchTerm(e.target.value)}
                className="sticky top-0 text-2xl"
            />
            <section>
                {filteredFeedback().map(c => (
                    <FeedbackCategory
                        key={c.name}
                        category={c}
                    />
                ))}
            </section>

        </div>
    )
}

export default GithubFeedback
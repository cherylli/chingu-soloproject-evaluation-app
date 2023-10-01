import FeedbackList from "@/components/feedback/FeedbackList";
import {FeedbackCategory as FeedbackCategoryType} from "@/types/FeedbackType";
import {initializeApp} from "@firebase/app";
import {getDownloadURL, getStorage, getStream, ref} from "@firebase/storage";

const firebaseConfig = {
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const getData = async () => {
    const url = await getDownloadURL(ref(storage, 'feedback.json'))
    const res = await fetch(url, {next: {tags: ['feedback']}})

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Feedback = async ({discordName}: { discordName: string }) => {
    const feedbackData = await getData()
    const categories = feedbackData.categories as FeedbackCategoryType[]
    return (
        <FeedbackList discordName={discordName} categories={categories}/>
    )
}
export default Feedback
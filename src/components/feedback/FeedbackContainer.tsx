import FeedbackList from '@/components/feedback/FeedbackList';
import { env } from '@/env';
import { FeedbackCategory as FeedbackCategoryType } from '@/types/FeedbackType';
import { initializeApp } from '@firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
} from '@firebase/storage';

const firebaseConfig = {
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const getData = async () => {
  const url = await getDownloadURL(
    ref(storage, 'feedback.json')
  );
  const res = await fetch(url, {
    next: { tags: ['feedback'] },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const Feedback = async ({
  discordId,
}: {
  discordId: string;
}) => {
  const feedbackData = await getData();
  const categories =
    feedbackData.categories as FeedbackCategoryType[];
  return (
    <FeedbackList
      discordId={discordId}
      categories={categories}
    />
  );
};
export default Feedback;

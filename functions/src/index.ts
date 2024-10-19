import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';


if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore(); 
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

interface VideoSnippet {
  title: string;
  description: string;
}

interface VideoItem {
  id: { videoId: string };
  snippet: VideoSnippet;
}

export const dailyVideoCheck = functions.pubsub.schedule('every 24 hours').onRun(async () => {
  const VIDEO_CACHE_DOC = db.collection('cache').doc('youtubeVideos'); 

  try {
    
    const response = await axios.get<{ items: VideoItem[] }>(YOUTUBE_API_URL, {
      params: {
        key: functions.config().youtube.key, 
        channelId: functions.config().youtube.channel_id, 
        part: 'snippet,id',
        order: 'date',
        maxResults: 50,
      },
    });

    const filteredVideos = response.data.items.filter((video: VideoItem) =>
      ['#photography', '#videography'].some(tag => video.snippet.description.includes(tag))
    );

    await VIDEO_CACHE_DOC.set({
      videos: filteredVideos,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('Videos successfully fetched and cached');
  } catch (error: any) {
    console.error('Failed to fetch or cache videos:', error.message || error);
  }

  return null; 
});

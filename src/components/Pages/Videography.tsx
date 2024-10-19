import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase";

export function Videography() {
    const [youtubeUrls, setYoutubeUrls] = useState<string[]>([]);
    const storageRef = ref(storage, 'videos/');

    useEffect(() => {
        async function fetchData() {
            const response = await listAll(storageRef);
            const urlsToAdd = await Promise.all(response.items.map(item => getDownloadURL(item)));
            const uniqueUrls = [...new Set(urlsToAdd)];

            const videoData = await Promise.all(
                uniqueUrls.map(async videoUrl => {
                    return (await fetch(videoUrl)).text();
                })
            );

            setYoutubeUrls(videoData);
        }

        void fetchData();
    }, []);

    return (
        <>
            <h2 className="subTitle">Videography</h2>
            {youtubeUrls.map((url, index) => {
                const trimmedUrl = url.trim();
                const matchPattern = /url:\s*(.*?)\s*titel:\s*(.*?)\s*tekst:\s*(.*)/i;
                const matchResult = trimmedUrl.match(matchPattern);

                const videoUrl = matchResult ? matchResult[1].trim() : '';
                const videoTitle = matchResult ? matchResult[2].trim() : '';
                const videoText = matchResult ? matchResult[3].trim() : '';

                return (
                    <div key={index}>
                        <h3 style={{ textAlign: "center", color: "#1B425E" }}>{videoTitle}</h3>
                        <div className="video-container">
                            <iframe
                                className="video"
                                src={videoUrl}
                                title={`Video ${index}`}
                                allowFullScreen
                                loading="lazy"
                                width="640"
                                height="370"
                                aria-label={`Video ${index}`}
                            ></iframe>
                        </div>
                        <p className="text-video">{videoText}</p>
                    </div>
                );
            })}
        </>
    );
}

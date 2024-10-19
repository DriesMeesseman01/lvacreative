import {useEffect, useState} from "react";
import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "../../firebase";
import "../../css/videography.css"

export function Cinematography() {
    const [youtubeUrls, setYoutubeUrls] = useState<string[]>([]);
    const storageRef = ref(storage, 'cinematography/');

    useEffect(() => {
        // Use an async function to fetch and process the data
        async function fetchData() {
            try {
                const response = await listAll(storageRef);
                const urlsToAdd = await Promise.all(response.items.map(item => getDownloadURL(item)));
                const uniqueUrls = [...new Set(urlsToAdd)];

                // Use Promise.all to fetch the video data asynchronously
                const videoData = await Promise.all(
                    uniqueUrls.map(async videoUrl => {
                        const response = await fetch(videoUrl);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                );

                // Update the state with the fetched video data
                setYoutubeUrls(videoData);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // Call the fetchData function
        void fetchData();
    });
	return (
		<>
			<h2 className="subTitle">Cinematography</h2>
			{youtubeUrls.map((url, index) => {

    // Trim the input string to remove leading and trailing whitespace
    const trimmedUrl = url.trim();

    // Create a flexible regular expression pattern to match the fields
    const matchPattern = /url:\s*(.*?)\s*titel:\s*(.*?)\s*tekst:\s*(.*)/i;
    const matchResult = trimmedUrl.match(matchPattern);


    const videoUrl = matchResult ? matchResult[1].trim() : '';
    const videoTitle = matchResult ? matchResult[2].trim() : '';
    const videoText = matchResult ? matchResult[3].trim() : '';

    // Use curly braces {} for variable interpolation, and provide a key prop
    return (
        <div key={index}>
            <h3 style={{textAlign:"center", color:"#1B425E"}}>{videoTitle}</h3>
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

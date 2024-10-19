import {useRef, useEffect, useState} from "react";
import "../../css/banner.css";
import {ImageSlides} from "./ImageSlides";
import {useNavigate} from "react-router-dom";
import s3 from "../../aws-config";
import {generatePresignedUrl} from "../Pages/Photography";

export function Banner() {
    const navigate = useNavigate();
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const bucketName = 'lva-creative';
        const folderPrefix = 'images/Banner';

        // Use the listObjects operation to fetch object keys within the specified prefix
        s3.listObjects({Bucket: bucketName, Prefix: folderPrefix}, (err, data) => {
            if (err) {
                console.error('Error fetching object keys from S3:', err);
            } else {
                const objectKeys = data.Contents?.map((item) => item.Key || '') || [];

                // Generate pre-signed URLs for each object key
                const promises = objectKeys.map((key) => {
                    return generatePresignedUrl(bucketName, key);
                });

                Promise.all(promises).then((urls) => {
                        const urlsExcludingFirst = urls.slice(1);
                        setImageUrls(urlsExcludingFirst);
                    })
                    .catch((error) => {
                        console.error('Error generating pre-signed URLs:', error);
                    });
            }
        });
    }, []);

    useEffect(() => {
        const handleResize = () => {
            windowSize.current = [window.innerWidth, window.innerHeight];
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <section className="banner">
                <article className="banner-background">
                    <ImageSlides slides={imageUrls} parrentWidth={windowSize.current[0]}/>
                </article>
                <article className="centered">
                    <div className="overflow-hidden">
                        <div className="banner-title drop-in">
                            <img className="logo-banner" src={require("../../images/logo_wit.png")} alt="logo"/>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <div className="banner-cta drop-in-2">
							<button className="navigationBtn" onClick={() => navigate("/cinematography")}>
                                <span>Cinematography</span>
                                <i></i>
                            </button>
                            <button className="navigationBtn" onClick={() => navigate("/videography")}>
                                <span>Videography</span>
                                <i></i>
                            </button>
							<button className="navigationBtn" onClick={() => navigate("/photography")}>
                                <span>Photography</span>
                                <i></i>
                            </button>
                        </div>
                    </div>
                </article>
            </section>
        </>
    );
}

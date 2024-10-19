import {useEffect, useState} from 'react';
import Loader from '../General/Loader';
import {ImageGallery} from '../Photography/ImageGallery';
import s3 from './../../aws-config';
import {PhotoGenres} from "../Photography/PhotoGenres";

export function Photography() {
    const [newCategory, setCategory] = useState<string>("Open Kaart");
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		const bucketName = 'lva-creative';
		const folderPrefix = `images/${newCategory}`;
	
		s3.listObjects({ Bucket: bucketName, Prefix: folderPrefix }, async (err, data) => {
			const objectKeys = (data.Contents ? data.Contents.map(item => item.Key).slice(1) : []);

			let urls: string[] = [];
			objectKeys.forEach(async (x) => {
				const url: string = await generatePresignedUrl(bucketName, x);
				urls.push(url);
			})
	
			setImageUrls(urls);
			setLoading(false);
		});
	}, [newCategory]);
	
    return (
        <>
            {isLoading ? (
                <Loader/>
            ) : (
                <>
                    <PhotoGenres category={newCategory} setCategory={setCategory}/>
                    <ImageGallery images={imageUrls}/>
                </>
            )}
        </>
    );
}

export function generatePresignedUrl(bucketName: string, objectKey: string | undefined) {
    const params = {
        Bucket: bucketName,
        Key: objectKey,
        Expires: 3600, 
    };

    return s3.getSignedUrl('getObject', params);
}

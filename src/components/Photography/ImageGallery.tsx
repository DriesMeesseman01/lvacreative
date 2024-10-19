import { Fragment, useEffect, useState } from 'react';
import FsLightbox from 'fslightbox-react';
import '../../css/imageGallery.css';
import Loader from '../General/Loader';

export interface ImageProps {
    images: string[];
}

export function ImageGallery({ images }: ImageProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentImages, setCurrentImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const imagesPerPage = 18;

    useEffect(() => {
        const fetchImages = () => {
            const start = (currentPage - 1) * imagesPerPage;
            setCurrentImages(images.slice(start, start + imagesPerPage));
            setIsLoading(false);
        };
        setIsLoading(true);
        const timer = setTimeout(fetchImages, 1000);
        return () => clearTimeout(timer);
    }, [currentPage, images]);

    const openLightbox = (index: number) => {
        setLightboxOpen(true);
        setLightboxIndex(index);
    };

    const paginate = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="gallery">
                    {currentImages.map((src, idx) => (
                        <div className="image" key={idx}>
                            <img
                                src={src}
                                alt={`Image ${idx + 1}`}
                                onClick={() => openLightbox(idx)}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}

            {lightboxOpen && (
                <FsLightbox
                    toggler={lightboxOpen}
                    sources={images}
                    sourceIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}

            <div className="pagination">
                {images.length > imagesPerPage && 
                    Array.from({ length: Math.ceil(images.length / imagesPerPage) }).map((_, i) => (
                        <Fragment key={i}>
                            <button
                                className={`paginateBtn ${currentPage === i + 1 ? 'selected' : ''}`}
                                onClick={() => paginate(i + 1)}
                            >
                                {i + 1}
                            </button>
                            {(i + 1) % 5 === 0 && <br />}
                        </Fragment>
                    ))}
            </div>
        </>
    );
}

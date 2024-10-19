import {useCallback, useEffect, useRef, useState} from "react";

interface SlideProps {
    slides: string[];
    parrentWidth: number;
}

const slidesStyles = {
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center"
}


const sliderStyles = {
    positon: "relative",
    height: "100%",
    overflow: "hidden"
}

const slidesContainerStyles = {
    display: 'flex',
    height: '100%',
}


export function ImageSlides({slides, parrentWidth}: SlideProps) {
    const timerRef = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }, [currentIndex, slides]);
    const getSlideStylesWithBackground = (slideIndex: number) => ({
        ...slidesStyles,
        backgroundImage: `url(${slides[slideIndex]})`,
        width: `${parrentWidth}px`
    })
    const getSlidesContainerStylesWithWidth = () => ({
        ...slidesContainerStyles,
        width: parrentWidth * slides.length,
        transform: `translateX(${-(currentIndex * parrentWidth)}px)`
    })

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            goToNext()
        }, 5000)

        return () => clearTimeout(timerRef.current)
    })
    return (
        <div style={sliderStyles}>
            <div style={getSlidesContainerStylesWithWidth()}>
                {slides.map((_, slideIndex) => (
                    <div key={slideIndex} style={getSlideStylesWithBackground(slideIndex)}></div>
                ))}
            </div>
        </div>
    )
}

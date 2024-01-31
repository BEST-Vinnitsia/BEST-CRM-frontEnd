import React, { useEffect, useRef, useState } from 'react';
import style from './scrollY.module.scss';

interface IProps {
    children?: React.ReactNode;
    sx?: {
        h?: string;
        maxH?: string;
        minH?: string;
        p?: string;
    };
}

export default function ScrollY({ children, sx }: IProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);

    const [thumbHeight, setThumbHeight] = useState(20);
    const [isDragging, setIsDragging] = useState(false);
    const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
    const [initialContentScrollTop, setInitialContentScrollTop] = useState<number>(0);

    sx = {
        h: sx && sx.h ? sx.h : undefined,
        maxH: sx && sx.maxH ? sx.maxH : undefined,
        minH: sx && sx.minH ? sx.minH : undefined,
        p: sx && sx.p ? sx.p : undefined,
    };

    function handleResize() {
        if (scrollTrackRef.current && contentRef.current) {
            const trackSize = scrollTrackRef.current.clientHeight;

            const contentVisible = contentRef.current.clientHeight;
            const contentTotalHeight = contentRef.current.scrollHeight;

            setThumbHeight(Math.max((contentVisible / contentTotalHeight) * trackSize, 20));
        }
    }

    function handleThumbPosition() {
        if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
            return;
        }

        const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
        const { clientHeight: trackHeight } = scrollTrackRef.current;

        let newTop = (contentTop / contentHeight) * trackHeight;
        newTop = Math.min(newTop, trackHeight - thumbHeight);

        const thumb = scrollThumbRef.current;
        requestAnimationFrame(() => {
            thumb.style.top = `${newTop}px`;
        });
    }

    useEffect(() => {
        if (contentRef.current) {
            const content = contentRef.current;

            observer.current = new ResizeObserver(() => {
                handleResize();
            });
            observer.current.observe(content);
            content.addEventListener('scroll', handleThumbPosition);

            return () => {
                observer.current?.unobserve(content);
                content.removeEventListener('scroll', handleThumbPosition);
            };
        }
    }, []);

    function handleThumbMousedown(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        setScrollStartPosition(e.clientY);

        if (contentRef.current) setInitialContentScrollTop(contentRef.current.scrollTop);
        setIsDragging(true);
    }

    const handleThumbMouseup = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isDragging) {
            setIsDragging(false);
        }
    };

    const handleThumbMousemove = (e: MouseEvent) => {
        if (contentRef.current) {
            // e.preventDefault();
            e.stopPropagation();

            if (isDragging) {
                const contentClientHeight = contentRef.current.clientHeight;
                const contentScrollHeight = contentRef.current.clientHeight;

                const deltaY = (e.clientY - scrollStartPosition) * (contentClientHeight / thumbHeight);

                const newScrollTop = Math.min(
                    initialContentScrollTop + deltaY,
                    contentScrollHeight - contentClientHeight,
                );

                contentRef.current.scrollTop = newScrollTop;
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);

        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);

    function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();

        const track = scrollTrackRef.current;
        const content = contentRef.current;

        if (track && content) {
            const { clientY } = e;
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const trackTop = rect.top;
            const thumbOffset = -(thumbHeight / 2);
            const clickRatio = (clientY - trackTop + thumbOffset) / track.clientHeight;
            const scrollAmount = Math.floor(clickRatio * content.scrollHeight);

            content.scrollTo({
                top: scrollAmount,
                behavior: 'smooth',
            });
        }
    }

    // const handleScrollButton = (direction: 'up' | 'down') => {
    //     const content = contentRef.current;
    //
    //     if (content) {
    //         const scrollAmount = direction === 'down' ? 200 : -200;
    //         content.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    //     }
    // }

    return (
        <div className={style['scrollY-container']}>
            <div
                ref={contentRef}
                className={style['scrollY-container__content']}
                style={{ height: sx?.h, maxHeight: sx?.maxH, minHeight: sx?.minH, padding: sx?.p }}
            >
                {children}
            </div>

            <div className={style['scrollY-container__scrollbar']}>
                {/*<button></button>*/}
                <div className={style['scrollY-container__scrollbar-trackAndThumb']}>
                    <div
                        ref={scrollTrackRef}
                        className={style['scrollY-container__scrollbar-trackAndThumb-track']}
                        onClick={handleTrackClick}
                        style={{ cursor: isDragging ? 'grabbing' : undefined }}
                    />
                    <div
                        ref={scrollThumbRef}
                        className={style['scrollY-container__scrollbar-trackAndThumb-thumb']}
                        onMouseDown={handleThumbMousedown}
                        style={{
                            height: `${thumbHeight}px`,
                            cursor: isDragging ? 'grabbing' : 'grab',
                        }}
                    />
                </div>
                {/*<button></button>*/}
            </div>
        </div>
    );
}

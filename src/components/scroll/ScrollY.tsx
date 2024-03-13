import React, { useCallback, useEffect, useRef, useState } from 'react';
import style from './scrollY.module.scss';

interface IProps {
    children?: React.ReactNode;
}

export default function ScrollY({ children }: IProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);

    const [thumbHeight, setThumbHeight] = useState<number>(20);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
    const [initialContentScrollTop, setInitialContentScrollTop] = useState<number>(0);

    // resize
    const handleResize = useCallback(() => {
        if (scrollTrackRef.current && contentRef.current) {
            const trackSize = scrollTrackRef.current.clientHeight;
            const contentVisible = contentRef.current.clientHeight;
            const contentTotalHeight = contentRef.current.scrollHeight;

            setThumbHeight(Math.max((contentVisible / contentTotalHeight) * trackSize, 20));
        }
    }, [children]);

    // thumb position
    const handleThumbPosition = useCallback(() => {
        if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) return;

        const { scrollTop, scrollHeight } = contentRef.current;
        const { clientHeight } = scrollTrackRef.current;

        let newTop = (scrollTop / scrollHeight) * clientHeight;
        newTop = Math.min(newTop, clientHeight - thumbHeight);

        const thumb = scrollThumbRef.current;

        requestAnimationFrame(() => (thumb.style.top = `${newTop}px`));
    }, [thumbHeight]);

    useEffect(() => {
        if (contentRef.current) {
            const content = contentRef.current;

            observer.current = new ResizeObserver(() => handleResize());
            observer.current.observe(content);

            content.addEventListener('scroll', handleThumbPosition);

            return () => {
                observer.current?.unobserve(content);
                content.removeEventListener('scroll', handleThumbPosition);
            };
        }
    }, [handleResize, handleThumbPosition]);

    //
    //
    //

    // thumb mousedown
    const handleThumbMousedown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setScrollStartPosition(e.clientY);

        if (contentRef.current) setInitialContentScrollTop(contentRef.current.scrollTop);

        setIsDragging(true);
    }, []);

    // thumb mouseup
    const handleThumbMouseup = useCallback(
        (e: MouseEvent) => {
            // e.preventDefault();
            e.stopPropagation();

            if (isDragging) setIsDragging(false);
        },
        [isDragging],
    );

    // thumb mousemove
    const handleThumbMousemove = useCallback(
        (e: MouseEvent) => {
            if (contentRef.current && isDragging) {
                e.stopPropagation();
                const { scrollHeight, clientHeight } = contentRef.current;

                const Y = (e.clientY - scrollStartPosition) * (clientHeight / thumbHeight);
                const newScrollTop = Math.min(initialContentScrollTop + Y, scrollHeight - clientHeight);

                contentRef.current.scrollTop = newScrollTop;
            }
        },
        [isDragging, initialContentScrollTop, thumbHeight, scrollStartPosition],
    );

    useEffect(() => {
        document.addEventListener('mousemove', handleThumbMousemove);
        document.addEventListener('mouseup', handleThumbMouseup);

        return () => {
            document.removeEventListener('mousemove', handleThumbMousemove);
            document.removeEventListener('mouseup', handleThumbMouseup);
        };
    }, [handleThumbMousemove, handleThumbMouseup]);

    // track click
    const handleTrackClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
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
        },
        [thumbHeight],
    );

    return (
        <div className={style['scrollY-container']}>
            <div ref={contentRef} className={style['scrollY-container__content']}>
                {children}
            </div>

            <div className={style['scrollY-container__scrollbar']}>
                <div className={style['scrollY-container__scrollbar-trackAndThumb']}>
                    <div
                        ref={scrollTrackRef}
                        className={style['scrollY-container__scrollbar-trackAndThumb-track']}
                        onClick={handleTrackClick}
                    />
                    <div
                        ref={scrollThumbRef}
                        className={style['scrollY-container__scrollbar-trackAndThumb-thumb']}
                        onMouseDown={handleThumbMousedown}
                        style={{
                            height: `${thumbHeight}px`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

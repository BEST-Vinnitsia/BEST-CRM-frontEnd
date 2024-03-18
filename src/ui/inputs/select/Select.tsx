import React, { useEffect, useRef, useState } from 'react';
import style from './select.module.scss';
import { js } from '../../../helpers';
import { SvgArrowBottom, SvgArrowTop } from '../../../assets/svg';
import { createPortal } from 'react-dom';

interface IProps {
    label: string;
    value: string;
    setValue: (data: string) => void;
    arr: { value: string; title: string }[] | [];
}

interface IPosition {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
}

export default function Select({ label, setValue, value, arr }: IProps) {
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const [inputPosition, setInputPosition] = useState<IPosition | null>(null);
    const [viewList, setViewList] = useState(false);

    const onChangeHandler = (value: string) => {
        setValue(value);
        setViewList(false);
    };

    const toggleList = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setViewList((prev) => !prev);
        setInputPosition(inputRef.current ? inputRef.current.getBoundingClientRect() : null);
    };

    const focusHandler = () => {
        setViewList(true);
        setInputPosition(inputRef.current ? inputRef.current.getBoundingClientRect() : null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputContainerRef.current &&
                selectRef.current &&
                !inputContainerRef.current.contains(e.target as Node) &&
                !selectRef.current.contains(e.target as Node)
            ) {
                setViewList(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={inputContainerRef}>
            <div
                ref={inputRef}
                onClick={focusHandler}
                className={js(
                    style['inputPassword'],
                    viewList ? style['inputPassword--focus'] : '',
                    value !== '' ? style['inputPassword--change'] : '',
                )}
            >
                <label className={style['inputPassword__label']}>{label}</label>

                <div className={style['inputPassword__fieldContainer']}>
                    {value !== '' ? arr.find((item) => item.value === value)?.title : ''}
                </div>

                <div className={style['inputPassword__buttonContainer']}>
                    <button className={style['inputPassword__buttonContainer-button']} onClick={(e) => toggleList(e)}>
                        <div className={style['inputPassword__buttonContainer-button-svg']}>
                            {viewList ? <SvgArrowTop /> : <SvgArrowBottom />}
                        </div>
                    </button>
                </div>
            </div>

            {viewList &&
                inputPosition &&
                inputRef.current &&
                createPortal(
                    <div
                        ref={selectRef}
                        className={style['select-list']}
                        style={{
                            top: inputPosition.top + inputPosition.height + 4,
                            left: inputPosition.left,
                            width: inputPosition.width,
                        }}
                    >
                        <div className={style['select-list__inner']}>
                            {arr.map((item, i) => (
                                <button
                                    key={i}
                                    className={style['select-list__inner-button']}
                                    onClick={() => onChangeHandler(item.value)}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}

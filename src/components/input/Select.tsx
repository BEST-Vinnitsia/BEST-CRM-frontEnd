import React, { useEffect, useRef, useState } from 'react';
import style from './select.module.scss';
import { joinStyle } from '../../utils/';
import { AnimatePresence, motion } from 'framer-motion';
import CircleButton from '../button/CircleButton';
import { SvgArrowBottom, SvgArrowTop } from '../../assets/svg';
import { animationOpacity } from '../../styles/animationConfig';
import { ScrollY, SelectButton } from '../index';
import { ISelectHookProps } from '../../interfaces/components/select';
import { createPortal } from 'react-dom';

interface ITargetPosition {
    top: number;
    bottom: number;
    left: number;
    right: number;
    width: number;
}

const portal = document.getElementById('portal-popup');

export default function Select({ placeholder, hookProps, data }: ISelectHookProps) {
    const { value, setValue, error } = hookProps;

    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
    const [filteredData, setFilteredData] = useState(data);
    const [selectData, setSelectData] = useState('');
    const [inputPosition, setInputPosition] = useState<ITargetPosition>();

    const observer = useRef<ResizeObserver | null>(null);

    const selectMainContainerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLInputElement>(null);
    const selectContainerRef = useRef<HTMLDivElement>(null);
    const selectButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && selectContainerRef.current && selectButtonRef.current) {
                const targetNode = event.target as Node | null;

                if (
                    !selectRef.current.contains(targetNode) &&
                    !selectContainerRef.current.contains(targetNode) &&
                    !selectButtonRef.current.contains(targetNode)
                ) {
                    onBlurHandler();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleResize = () => {
        if (selectMainContainerRef.current) {
            setInputPosition(selectMainContainerRef.current.getBoundingClientRect());
        }
    };

    useEffect(() => {
        if (selectMainContainerRef.current) {
            const content = selectMainContainerRef.current;

            observer.current = new ResizeObserver(() => {
                handleResize();
            });
            observer.current.observe(content);

            return () => {
                observer.current?.unobserve(content);
            };
        }
    }, []);

    const onFocusHandler = () => {
        setFocus(true);

        if (selectRef?.current) {
            selectRef.current.focus();
        }
    };

    const onBlurHandler = () => {
        setVisited(true);
        setFocus(false);
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSelectData(inputValue);
        const filteredList = data.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredData(filteredList);
    };

    const handlerSelect = (id: string) => {
        setValue(id);
        const findRes = data.find((item) => item.id === id);
        setSelectData(findRes && findRes.name ? findRes.name : '');
        onBlurHandler();
    };

    if (!portal) return <></>;

    const SelectPanel = () => {
        return createPortal(
            <AnimatePresence>
                {focus && (
                    <motion.div
                        ref={selectContainerRef}
                        className={style['selectContainer']}
                        style={{
                            top: inputPosition?.bottom,
                            left: inputPosition?.left,
                            width: inputPosition?.width,
                        }}
                        {...animationOpacity}
                    >
                        <ScrollY>
                            {filteredData.map((item) => (
                                <SelectButton key={item.id} title={item.name} onClick={() => handlerSelect(item.id)} />
                            ))}
                        </ScrollY>
                    </motion.div>
                )}
            </AnimatePresence>,
            portal,
        );
    };

    return (
        <>
            <div
                ref={selectMainContainerRef}
                className={joinStyle(
                    style['select'],
                    style[`select--error-${visited && error}`],
                    style[`select--focus-${focus}`],
                    style[`select--change-${selectData !== ''}`],
                )}
            >
                <div className={style['select__wrapper']}>
                    <label className={style['select__wrapper-label']}>{placeholder}</label>

                    <div className={style['select__wrapper-container']}>
                        <input
                            ref={selectRef}
                            type="text"
                            onFocus={onFocusHandler}
                            onChange={onChangeHandler}
                            value={selectData}
                            autoComplete="off"
                        />

                        <div className={style['select__wrapper-container-button']}>
                            <CircleButton
                                elementRef={selectButtonRef}
                                svg={focus ? <SvgArrowTop /> : <SvgArrowBottom />}
                                onClick={focus ? onBlurHandler : onFocusHandler}
                            />
                        </div>

                        <fieldset>
                            <legend>
                                <span>{placeholder}</span>
                            </legend>
                        </fieldset>
                    </div>

                    <SelectPanel />
                </div>
            </div>
        </>
    );
}

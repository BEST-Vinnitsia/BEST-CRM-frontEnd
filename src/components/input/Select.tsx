import React, { useEffect, useRef, useState } from 'react';
import style from './select.module.scss';
import { joinStyle } from '../../utils/';
import CircleButton from '../button/CircleButton';
import { SvgArrowBottom, SvgArrowTop } from '../../assets/svg';
import { ISelectHookProps } from '../../interfaces/components/select';
import { SelectButton } from '../index';
import { useOutsideClick } from '../../hooks';

export default function Select({ placeholder, hookProps, data }: ISelectHookProps) {
    const { value, setValue, error } = hookProps;
    const ref = useRef(null);

    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
    const [filteredData, setFilteredData] = useState<{ id: number | string; name: string }[]>([]);
    const [selectData, setSelectData] = useState('');

    useEffect(() => {
        setSelectData(value);
        setValueSelect();
    }, [value]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const onFocusHandler = () => {
        setFocus(true);
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

    const handlerSelect = (id: number | string) => {
        setValue(id.toString());
        const findRes = data.find((item) => item.id === id);
        setSelectData(findRes && findRes.name ? findRes.name : '');
        onBlurHandler();
        setValueSelect();
    };

    useOutsideClick({
        elementRef: ref,
        handler: onBlurHandler,
        enable: focus,
    });

    const setValueSelect = () => {
        const selectDataId = data.find((item) => item.id.toString() === value);
        if (selectDataId && selectDataId.name) setSelectData(selectDataId.name);
    };

    return (
        <>
            <div
                ref={ref}
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
                            type="text"
                            onFocus={onFocusHandler}
                            onChange={onChangeHandler}
                            value={selectData}
                            autoComplete="off"
                        />

                        <div className={style['select__wrapper-container-button']}>
                            <CircleButton
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

                    {focus && (
                        <div className={style['selectContainer']}>
                            {filteredData.map((item) => (
                                <SelectButton key={item.id} title={item.name} onClick={() => handlerSelect(item.id)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

import React, { useEffect, useRef, useState } from 'react';
import style from './select.module.scss';
import { joinStyle } from '../../utils/';
import CircleButton from '../button/CircleButton';
import { SvgArrowBottom, SvgArrowTop } from '../../assets/svg';
import { SelectButton } from '../index';
import { useOutsideClick } from '../../hooks';

interface IProps {
    placeholder: string;
    selected: string;
    error: boolean;
    onChange: (data: string) => void;
    data: { id: number; name: string }[];
}

export default function SelectSimple({ placeholder, selected, onChange, error, data }: IProps) {
    const ref = useRef(null);

    const [value, setValue] = useState('');

    const [focus, setFocus] = useState(false);
    const [visited, setVisited] = useState(false);
    const [filteredData, setFilteredData] = useState<{ id: number | string; name: string }[]>([]);
    const [selectData, setSelectData] = useState('');

    useEffect(() => {
        setSelectData(selected);
    }, [selected]);

    useEffect(() => {
        setValueSelect();
    }, [selectData]);

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
        setValue(inputValue);
        const filteredList = data.filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredData(filteredList);
    };

    const handlerSelect = (id: number | string) => {
        onChange(id.toString());
        const findRes = data.find((item) => item.id === id);
        setSelectData(findRes && findRes.name ? findRes.name : '');
        onBlurHandler();
        setValueSelect()
    };

    const setValueSelect = () => {
        const selectDataId = data.find((item) => item.id.toString() === selected);
        if (selectDataId && selectDataId.name) setValue(selectDataId.name);
    }

    useOutsideClick({
        elementRef: ref,
        handler: onBlurHandler,
        enable: focus,
    });

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
                            value={value}
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

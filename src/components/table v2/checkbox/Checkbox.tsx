import React from 'react';
import style from './checkbox.module.scss';
import { SvgCheckboxActive, SvgCheckboxClear, SvgCheckboxInactive } from '../../../assets/svg';
import { joinStyle } from '../../../utils/';

interface IPropsBody {
    active?: boolean;
    onClick?: () => void;
}

interface IPropsHead {
    active?: '0' | '1' | '2';
    onClick?: () => void;
    isHead?: boolean;
}

export default function Checkbox(props: IPropsBody | IPropsHead) {
    const { active, onClick } = props;
    const isHeadProps = 'isHead' in props;
    const isHead = isHeadProps && props.isHead;

    const CheckboxContent = () => {
        return (
            <div className={style['checkbox']} onClick={onClick}>
                <span
                    className={joinStyle(
                        style['checkbox__svg-container'],
                        style[
                            `checkbox__svg-container--${
                                active === true || active === '1' || active === '2' ? 'active' : 'inactive'
                            }`
                        ],
                    )}
                >
                    {isHeadProps ? (
                        <>
                            {active === '0' && <SvgCheckboxInactive />}
                            {active === '1' && <SvgCheckboxActive />}
                            {active === '2' && <SvgCheckboxClear />}
                        </>
                    ) : (
                        <>
                            {active === true && <SvgCheckboxActive />}
                            {active === false && <SvgCheckboxInactive />}
                        </>
                    )}
                </span>
            </div>
        );
    };

    return (
        <>
            {isHead ? (
                <th className={style['table__head-cell']}>
                    <CheckboxContent />
                </th>
            ) : (
                <td className={style['table__body-cell']}>
                    <CheckboxContent />
                </td>
            )}
        </>
    );
}

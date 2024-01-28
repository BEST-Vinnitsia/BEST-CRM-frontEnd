import React, { useState } from 'react';
import style from './table.module.scss';
import { joinStyle } from '../../utils/';
import TabContainer from './tab/TabContainer';
import TableTab from './tab/Tab';
import { SvgCheckboxInactive, SvgCheckboxActive } from '../../assets/svg';
import Checkbox from './checkbox/Checkbox';
import Text from './text/Text';
import HeadCell from './headCell/HeadCell';
import ScrollX from '../scroll/ScrollX';
import Label from './label/Label';
import LabelContainer from './label/LabelContainer';
import Input from '../input/Input';
import { useInput } from '../../hooks';

interface ITabList {
    name: string;
    label: string;
    color: 'green' | 'yellow' | 'red' | 'white';
}

const tabList: ITabList[] = [
    { name: 'All', label: '10', color: 'white' },
    { name: 'Observer', label: '5', color: 'green' },
    { name: 'Baby', label: '2', color: 'yellow' },
    { name: 'Full', label: '2', color: 'red' },
    { name: 'Alumni', label: '1', color: 'white' },
];

export default function Table() {
    const [activeTab, setActiveTab] = useState('All');
    const [selectRows, setSelectRows] = useState<number[]>([]);
    const [state, setState] = useState<number[]>([0, 1, 2]);

    const changeTab = (tabName: string) => {
        setActiveTab(tabName);
    };

    const selectRow = (id: number) => {
        setSelectRows((prev) => {
            if (prev.includes(id)) {
                return prev.filter((selectedId) => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const checkSelectRow = (id: number) => {
        if (selectRows.includes(id)) return true;
        return false;
    };

    const selectAll = () => {
        const selectLength = selectRows.length;
        const stateLength = state.length;

        if (selectLength !== 0 && selectLength !== stateLength) {
            setSelectRows(state);
        } else if (selectLength === stateLength) {
            setSelectRows([]);
        } else if (selectLength === 0) {
            setSelectRows(state);
        }
    };

    const checkSelectAll = () => {
        const selectLength = selectRows.length;
        const stateLength = state.length;

        if (selectLength === stateLength) return '1';
        if (selectLength !== 0 && selectLength < stateLength) return '2';
        return '0';
    };

    return (
        <div className={style['table-block']}>
            <TabContainer>
                {tabList.map((item, i) => (
                    <TableTab
                        key={i}
                        title={item.name}
                        label={item.label}
                        status={activeTab === item.name}
                        color={item.color}
                        onClick={() => changeTab(item.name)}
                    />
                ))}
            </TabContainer>

            <ScrollX>
                <table className={style['table']}>
                    <thead>
                        <tr>
                            <Checkbox active={checkSelectAll()} onClick={selectAll} isHead />
                            <HeadCell text="Name" />
                            <HeadCell text="Phone" />
                            <HeadCell text="VNTU" />
                            <HeadCell text="Message" />
                            <HeadCell text="Status" />
                            <HeadCell text="Position" />
                            <HeadCell text="Event" />
                            <HeadCell text="Committee" />
                            <HeadCell text="Happy Birthday" />
                            <HeadCell />
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <Checkbox active={checkSelectRow(0)} onClick={() => selectRow(0)} />
                            <Text text="Name Surname" subtext="email@gmail.com" format="cascade" />
                            <Text text="+380971234567" format="phone" />
                            <Text text="ФМІБ" subtext="УБ-21б" format="cascade" />
                            <Text text="@telegram" />
                            <LabelContainer>
                                <Label title="Full" color="red" />
                            </LabelContainer>
                            <LabelContainer>
                                <Label title="President" color="yellow" />
                            </LabelContainer>
                            <LabelContainer>
                                <Label title="Anniversary" color="white" />
                                <Label title="It-Revolution" color="yellow" />
                            </LabelContainer>
                            <LabelContainer>
                                <Label title="Design" color="green" />
                                <Label title="IT" color="white" />
                            </LabelContainer>
                            <Text text="01.01.2001" />

                            <td />
                        </tr>
                        <tr>
                            <Checkbox active={checkSelectRow(1)} onClick={() => selectRow(1)} />
                            <Text text="Name Surname" subtext="email@gmail.com" format="cascade" />
                            <Text text="+380971234567" format="phone" />
                            <Text text="ФМІБ" subtext="УБ-21б" format="cascade" />
                            <Text text="@telegram" />
                            <LabelContainer>
                                <Label title="Observer" color="green" />
                            </LabelContainer>
                            <LabelContainer />
                            <LabelContainer />
                            <LabelContainer />
                            <Text text="01.01.2001" />

                            <td />
                        </tr>
                        <tr>
                            <Checkbox active={checkSelectRow(2)} onClick={() => selectRow(2)} />
                            <Text text="Name Surname and what you" subtext="email@gmail.com" format="cascade" />
                            <Text text="+380971234567" format="phone" />
                            <Text text="ФМІБ" subtext="УБ-21б" format="cascade" />
                            <Text text="@telegram" />
                            <LabelContainer>
                                <Label title="Baby" color="yellow" />
                            </LabelContainer>
                            <LabelContainer>
                                <></>
                            </LabelContainer>
                            <LabelContainer>
                                <Label title="BTW" color="red" />
                            </LabelContainer>
                            <LabelContainer>
                                <Label title="PR" color="green" />
                            </LabelContainer>
                            <Text text="01.01.2001" />

                            <td />
                        </tr>
                    </tbody>
                </table>
            </ScrollX>
        </div>
    );
}

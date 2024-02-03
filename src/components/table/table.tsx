import React, { useEffect, useRef, useState } from 'react';
import style from './table.module.scss';
import TabContainer from './tab/TabContainer';
import TableTab from './tab/Tab';
import ScrollX from '../scroll/ScrollX';

interface IProps {
    children: React.ReactNode;
}

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

export default function Table({ children }: IProps) {
    const [activeTab, setActiveTab] = useState(0);

    const changeTab = (tabId: number) => {
        setActiveTab(tabId);
    };

    return (
        <div className={style['table-block']}>
            <TabContainer activeTabId={activeTab}>
                {tabList.map((item, i) => (
                    <TableTab
                        key={i}
                        title={item.name}
                        label={item.label}
                        status={activeTab === i}
                        color={item.color}
                        onClick={() => changeTab(i)}
                    />
                ))}
            </TabContainer>

            <ScrollX>
                <table className={style['table']}>{children}</table>
            </ScrollX>
        </div>
    );
}

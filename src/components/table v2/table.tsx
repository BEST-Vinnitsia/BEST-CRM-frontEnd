import React, { useState } from 'react';
import style from './table.module.scss';
import { joinStyle } from '../../utils/joinClassName';
import TableTabContainer from './tab/TableTabContainer';
import TableTab from './tab/TableTab';

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
    const [activeTab, setActiveTab] = useState('');

    const changeTab = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div className={style['table']}>
            <TableTabContainer>
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
            </TableTabContainer>

            {/* <div>
                filters
                <div>selector find by</div>
                <div>input text (name, surname, phone, email, group, hb, active ...) </div>
            </div>*/}

            <table className={style['table__table-container']}>
                <thead>
                    <tr>
                        <th>asd</th>
                        <th>dsa</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>asd</td>
                        <td>dsa</td>
                    </tr>
                    <tr>
                        <td>asd</td>
                        <td>dsa</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

// ToDo

// photo and user name
// phone
// text (email, message)
// data (HB)
// label (status, events, committees, board, coordinator)
// фміб уб

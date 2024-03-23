import React from 'react';
import { PATH_BaC, PATH_CADENCE, PATH_DASHBOARD, PATH_EVENT, PATH_MEMBER, PATH_NEW_EVENT } from './paths';
import { SvgCommitteeSidebar, SvgDashboard, SvgEventSidebar, SvgInfoSidebar, SvgMembers } from '../assets/svg';

export const sidebarConfig = [
    {
        title: 'Dashboard',
        path: PATH_DASHBOARD.ROOT,
        svg: <SvgDashboard />,
    },
    {
        title: 'Members',
        path: PATH_BaC.ROOT,
        svg: <SvgMembers />,
    },
    {
        title: 'Event',
        path: PATH_EVENT.ROOT,
        svg: <SvgEventSidebar />,
    },
    {
        title: 'Event Categories',
        path: PATH_NEW_EVENT.ROOT,
        svg: <SvgEventSidebar />,
    },
    {
        title: 'Committee',
        path: PATH_MEMBER.ROOT,
        svg: <SvgCommitteeSidebar />,
    },
    {
        title: 'Info',
        path: PATH_CADENCE.ROOT,
        svg: <SvgInfoSidebar />,
    },
];

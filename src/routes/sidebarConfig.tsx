import React from 'react';
import { PATH_BaC, PATH_CADENCE, PATH_COMMITTEE, PATH_DASHBOARD, PATH_EVENT, PATH_MEMBER } from './paths';
import {
    SvgBoardAndCoordinatorsSidebar,
    SvgCommitteeSidebar,
    SvgEventSidebar,
    SvgHomeSidebar,
    SvgMembershipSidebar,
    SvgUserSidebar,
} from '../assets/svg';

export const sidebarConfig = [
    {
        title: 'Dashboard',
        path: PATH_DASHBOARD.ROOT,
        svg: <SvgHomeSidebar />,
    },
    {
        title: 'Members',
        path: PATH_BaC.ROOT,
        svg: <SvgBoardAndCoordinatorsSidebar />,
    },
    {
        title: 'Event',
        path: PATH_COMMITTEE.ROOT,
        svg: <SvgCommitteeSidebar />,
    },
    {
        title: 'Event Categories',
        path: PATH_EVENT.ROOT,
        svg: <SvgEventSidebar />,
    },
    {
        title: 'Committee',
        path: PATH_MEMBER.ROOT,
        svg: <SvgUserSidebar />,
    },
    {
        title: 'Info',
        path: PATH_CADENCE.ROOT,
        svg: <SvgMembershipSidebar />,
    },
];

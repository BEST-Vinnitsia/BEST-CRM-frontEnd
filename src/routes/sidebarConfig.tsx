import React from 'react';
import { PATH_COMMITTEE, PATH_DASHBOARD, PATH_EVENT, PATH_INFO, PATH_MEMBER } from './paths';
import { SvgCommittee, SvgDashboard, SvgEvent, SvgInfoSidebar, SvgMembers } from '../assets/svg';

export const sidebarConfig = [
    { title: 'Dashboard', path: PATH_DASHBOARD.ROOT, svg: <SvgDashboard /> },
    { title: 'Members', path: PATH_MEMBER.LIST, svg: <SvgMembers /> },
    { title: 'Committee', path: PATH_COMMITTEE.LIST, svg: <SvgCommittee /> },
    { title: 'Event', path: PATH_EVENT.LIST, svg: <SvgEvent /> },
    { title: 'Event categories', path: PATH_EVENT.CATEGORY.LIST, svg: <SvgEvent /> },
    { title: 'Info', path: PATH_INFO.ROOT, svg: <SvgInfoSidebar /> },
];

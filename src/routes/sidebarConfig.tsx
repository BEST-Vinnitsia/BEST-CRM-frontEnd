import React from 'react';
import { pageNames } from '../constants/pageNames';
import { PATH_BaC, PATH_COMMITTEE, PATH_DASHBOARD, PATH_EVENT, PATH_MEMBER, PATH_MEMBERSHIP } from './paths';
import {
    SvgBoardAndCoordinatorsSidebar,
    SvgCommitteeSidebar,
    SvgEventSidebar,
    SvgHomeSidebar,
    SvgMembershipSidebar,
    SvgUserSidebar,
} from '../assets/svg';

export const sidebarConfig = [
    { title: pageNames.pages.dashboard, path: PATH_DASHBOARD.ROOT, svg: <SvgHomeSidebar /> },
    { title: pageNames.pages.BaC, path: PATH_BaC.ROOT, svg: <SvgBoardAndCoordinatorsSidebar /> },
    { title: pageNames.pages.committee, path: PATH_COMMITTEE.ROOT, svg: <SvgCommitteeSidebar /> },
    { title: pageNames.pages.event, path: PATH_EVENT.ROOT, svg: <SvgEventSidebar /> },
    { title: pageNames.pages.member, path: PATH_MEMBER.ROOT, svg: <SvgUserSidebar /> },
    { title: pageNames.pages.membership, path: PATH_MEMBERSHIP.ROOT, svg: <SvgMembershipSidebar /> },
];

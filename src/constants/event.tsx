import { SvgInfo, SvgResponsible, SvgWg } from '../assets/svg';
import React from 'react';

export const eventKinds = ['Local', 'External', 'Internal'];

export const eventTypes = [
    { value: 'Local', title: 'Local' },
    { value: 'Internal', title: 'Internal' },
    { value: 'External', title: 'External' },
];

export const eventStatus = [
    { value: 'active', title: 'Active' },
    { value: 'in active', title: 'In active' },
    { value: 'completed', title: 'Completed' },
    { value: 'in progress', title: 'In progress' },
    { value: 'is relevant', title: 'Is relevant' },
];

export const eventTabs = [
    { title: 'Info', svg: <SvgInfo /> },
    { title: 'Responsible', svg: <SvgResponsible /> },
    { title: 'WG', svg: <SvgWg /> },
];

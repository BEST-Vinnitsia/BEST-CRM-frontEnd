import React from 'react';
import { SvgDesigner, SvgFr, SvgHr, SvgMo, SvgPr } from '../assets/svg';

export const getSvg = (name: string): React.ReactNode => {
    let svg: React.ReactNode;

    if (name.toLowerCase() === 'main organizer') svg = <SvgMo />;
    if (name.toLowerCase() === 'fundraising') svg = <SvgFr />;
    if (name.toLowerCase() === 'human responses') svg = <SvgHr />;
    if (name.toLowerCase() === 'public resources') svg = <SvgPr />;
    if (name.toLowerCase() === 'designer') svg = <SvgDesigner />;

    return svg;
};

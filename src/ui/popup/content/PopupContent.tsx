import React from 'react';
import style from './popupContent.module.scss';
import { js } from '../../../helpers';

type size = '2px' | '4px' | '6px' | '8px' | '10px' | '12px' | '16px' | '24px' | string;

interface stylePadding {
    paddingTop: undefined | string;
    paddingBottom: undefined | string;
    paddingLeft: undefined | string;
    paddingRight: undefined | string;
}

interface styleMargin {
    marginTop: undefined | string;
    marginBottom: undefined | string;
    marginLeft: undefined | string;
    marginRight: undefined | string;
}

//

interface IProps {
    children?: React.ReactNode;
    onOne?: boolean;
    // styles
    sx?: {
        // padding
        p?: size; // padding on all sides
        px?: size; // padding left and right
        py?: size; // padding top and bottom
        pt?: size; // padding top
        pb?: size; // padding bottom
        pl?: size; // padding left
        pr?: size; // padding right

        // margin
        m?: size;
        mx?: size; // margin left and right
        my?: size; // margin top and bottom
        mt?: size; // margin top
        mb?: size; // margin bottom
        ml?: size; // margin left
        mr?: size; // margin right
    };
}

export default function PopupContent({ children, sx, onOne = false }: IProps) {
    const padding = () => {
        const temp: stylePadding = {
            paddingTop: undefined,
            paddingBottom: undefined,
            paddingLeft: undefined,
            paddingRight: undefined,
        };

        if (!sx) return temp;

        if (sx.p) {
            temp.paddingRight = sx.p;
            temp.paddingLeft = sx.p;
            temp.paddingTop = sx.p;
            temp.paddingBottom = sx.p;
        }

        if (sx.pt) temp.paddingTop = sx.pt;
        if (sx.pb) temp.paddingBottom = sx.pb;
        if (sx.pr) temp.paddingRight = sx.pr;
        if (sx.pl) temp.paddingLeft = sx.pl;

        if (sx.px) {
            temp.paddingRight = sx.px;
            temp.paddingLeft = sx.px;
        }
        if (sx.py) {
            temp.paddingTop = sx.py;
            temp.paddingBottom = sx.py;
        }

        return temp;
    };

    const margin = () => {
        const temp: styleMargin = {
            marginTop: undefined,
            marginBottom: undefined,
            marginLeft: undefined,
            marginRight: undefined,
        };

        if (!sx) return temp;

        if (sx.m) {
            temp.marginRight = sx.m;
            temp.marginLeft = sx.m;
            temp.marginTop = sx.m;
            temp.marginBottom = sx.m;
        }

        if (sx.mt) temp.marginTop = sx.mt;
        if (sx.mb) temp.marginBottom = sx.mb;
        if (sx.mr) temp.marginRight = sx.mr;
        if (sx.ml) temp.marginLeft = sx.ml;

        if (sx.mx) {
            temp.marginRight = sx.mx;
            temp.marginLeft = sx.mx;
        }
        if (sx.my) {
            temp.marginTop = sx.my;
            temp.marginBottom = sx.my;
        }

        return temp;
    };

    return (
        <div
            className={js(style['popupContent'], onOne ? style['popupContent--one'] : '')}
            style={{
                ...padding(),
                ...margin(),
            }}
        >
            {children}
        </div>
    );
}

import React, { useEffect, useRef, useState } from 'react';
import style from './tab.module.scss';

interface IProps {
    children: React.ReactNode;
    activeTabId: number;
}

interface IActivePosition {
    width: number;
    left: number;
}

export default function TabContainer({ children, activeTabId }: IProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [allPosition, setAllPosition] = useState<IActivePosition[]>([]);

    useEffect(() => {
        const parentElement = ref.current;

        if (parentElement) {
            const childElements = parentElement.children;
            let correction = 0

            setAllPosition(
                Array.from(childElements).map((child, i) => {
                    const childPosition = child.getBoundingClientRect();

                    if (i === 0) correction = childPosition.left;

                    return { width: childPosition.width, left: childPosition.left - correction };
                }),
            );
        }
    }, [children]);

    return (
        <div className={style['table__tabs-external-wrapper']}>
            <div className={style['table__tabs-internal-wrapper']}>
                <div className={style['table__tabs-container']}>
                    <div ref={ref} className={style['table__tabs']}>
                        {children}
                    </div>
                    <span
                        className={style['table__tabs-line']}
                        style={{
                            width: `${allPosition[activeTabId]?.width}px`,
                            left: `${allPosition[activeTabId]?.left}px`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

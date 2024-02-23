import { useEffect, useRef, useState } from 'react';

export const useCheckbox = (data: number[]) => {
    const [selectRows, setSelectRows] = useState<number[]>([]);
    const allRows = useRef<number[]>([]);

    useEffect(() => {
        allRows.current = data;
    }, [data]);

    const selectRow = (id: number) => {
        setSelectRows((prev) => {
            if (prev.includes(id)) {
                return prev.filter((selectedId) => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const checkSelectRow = (id: number) => {
        return selectRows.includes(id);
    };

    const selectAll = () => {
        const selectLength = selectRows.length;
        const stateLength = allRows.current.length;

        if (selectLength !== 0 && selectLength !== stateLength) {
            setSelectRows(allRows.current);
        } else if (selectLength === stateLength) {
            setSelectRows([]);
        } else if (selectLength === 0) {
            setSelectRows(allRows.current);
        }
    };

    const checkSelectAll = () => {
        const selectLength = selectRows.length;
        const stateLength = allRows.current.length;

        if (selectLength === 0) return '0';
        if (selectLength === stateLength) return '1';
        if (selectLength !== 0 && selectLength < stateLength) return '2';
        return '0';
    };

    return {
        selectRows,
        selectRow,
        checkSelectRow,
        selectAll,
        checkSelectAll,
    };
};

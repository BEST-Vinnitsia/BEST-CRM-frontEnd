import { useEffect, useRef, useState } from 'react';

export const useCheckbox = (data: string[]) => {
    const [selectRows, setSelectRows] = useState<string[]>([]);
    const allRows = useRef<string[]>([]);
    
    useEffect(() => {
        allRows.current = data;
    }, [data]);

    const selectRow = (id: string) => {
        setSelectRows((prev) => {
            if (prev.includes(id)) {
                return prev.filter((selectedId) => selectedId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const checkSelectRow = (id: string) => {
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

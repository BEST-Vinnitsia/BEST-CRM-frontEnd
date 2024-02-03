import React, { useState } from 'react';

export const useCheckbox = (data: string[]) => {
    const [selectRows, setSelectRows] = useState<string[]>([]);
    const [allRows, setAllRows] = useState<string[]>(data);

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
        if (selectRows.includes(id)) return true;
        return false;
    };

    const selectAll = () => {
        const selectLength = selectRows.length;
        const stateLength = allRows.length;

        if (selectLength !== 0 && selectLength !== stateLength) {
            setSelectRows(allRows);
        } else if (selectLength === stateLength) {
            setSelectRows([]);
        } else if (selectLength === 0) {
            setSelectRows(allRows);
        }
    };

    const checkSelectAll = () => {
        const selectLength = selectRows.length;
        const stateLength = allRows.length;

        if (selectLength === stateLength) return '1';
        if (selectLength !== 0 && selectLength < stateLength) return '2';
        return '0';
    };

    return {
        setSelectRows,
        setAllRows,

        selectRow,
        checkSelectRow,
        selectAll,
        checkSelectAll,
    };
};

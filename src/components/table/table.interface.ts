export interface ITableContainerProps extends ITableHeadProps {
    children: React.ReactNode;
}

export interface ITableHeadProps {
    head: IHead[];
}

export interface ITableRowProps {
    titleList: IRow[];
}

interface IHead {
    size: '50' | '100' | '150' | '200' | '250' | '300';
    title: string;
}

interface IRow {
    title: string;
}

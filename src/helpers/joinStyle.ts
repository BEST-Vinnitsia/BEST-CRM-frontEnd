export const joinStyle = (...classNames: string[]): string => {
    let temp = classNames.join(' ');
    return temp.trim()
};

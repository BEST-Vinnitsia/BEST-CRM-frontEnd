export const checkRoutePath = (path: string, location: string) => {
    const regex = new RegExp(`^\\${path}`);
    const regex2 = new RegExp(`^\\${path}[0-9a-zA-Z]`);

    const match = regex.test(location);
    const match2 = regex2.test(location);

    if (match === true && match2 === false) return true;
    return false;
};

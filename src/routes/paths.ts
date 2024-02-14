const dashboard = (root: string) => ({
    ROOT: `${root}`,
});

const boardAndCoordinators = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}`,
    CREATE: `${root}/create`,
    EDIT: `${root}/edit`,
    DETAILS: `${root}/details`,
});

const committee = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}`,
    CREATE: `${root}/create`,
    EDIT: `${root}/edit`,
    DETAILS: `${root}/details`,
});

const member = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}`,
    CREATE: `${root}/create`,
    EDIT: `${root}/edit`,
    DETAILS: `${root}/details`,
});

const cadence = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}`,
    CREATE: `${root}/create`,
    EDIT: `${root}/edit`,
    DETAILS: `${root}/details`,
});

const event = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}`,
    CREATE: `${root}/create`,
    EDIT: `${root}/edit`,
    DETAILS: `${root}/details`,
});

const meeting = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}`,
    CREATE: `${root}/create`,
    EDIT: `${root}/edit`,
    DETAILS: `${root}/details`,
});

const account = (root: string) => ({
    PROFILE: `${root}/profile`,
});

const auth = (root: string) => ({
    ROOT: `${root}`,
    LOGIN: `${root}/login`,
});

const error = (root: string) => ({
    403: `${root}/403`,
    404: `${root}/404`,
    500: `${root}/500`,
});

export const PATH_DASHBOARD = dashboard('/');
export const PATH_BaC = boardAndCoordinators('/boardAndCoordinators');
export const PATH_COMMITTEE = committee('/committee');
export const PATH_EVENT = event('/event');
export const PATH_MEMBER = member('/member');
export const PATH_CADENCE = cadence('/cadence');
export const PATH_MEETING = meeting('/meeting');
//
export const PATH_ACCOUNT = account('/account');
export const PATH_AUTH = auth('/auth');
export const PATH_ERROR = error('/error');

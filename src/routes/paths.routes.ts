const home = (root: string) => ({
    ROOT: `${root}`,
});

const member = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}/list`,
});

const board = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}/list`,
});

const coordinator = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}/list`,
});

const committee = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}/list`,
});

const membership = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}/list`,
});

const meeting = (root: string) => ({
    ROOT: `${root}`,
    LIST: `${root}/list`,
});

const account = (root: string) => ({
    PROFILE: `${root}/profile`,
});

const auth = (root: string) => ({
    LOGIN: `${root}/login`,
    REGISTRATION: `${root}/registration`,
});

const error = (root: string) => ({
    403: `${root}/403`,
    404: `${root}/404`,
    500: `${root}/500`,
});

export const PATH_HOME = home('/home');
export const PATH_MEMBER = member('/member');
export const PATH_BOARD = board('/board');
export const PATH_COORDINATOR = coordinator('/coordinator');
export const PATH_COMMITTEE = committee('/committee');
export const PATH_MEMBERSHIP = membership('/membership');
export const PATH_MEETING = meeting('/meeting');
export const PATH_ACCOUNT = account('/account');
export const PATH_AUTH = auth('/auth');
export const PATH_ERROR = error('/error');

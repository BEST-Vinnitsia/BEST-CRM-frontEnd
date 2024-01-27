import React, { Suspense, lazy, ComponentType } from 'react';
import { Loader } from '../components';
// import ClaimsGuard from '../guards/claim.guard';

interface iLoadable {
    claims?: string[] | undefined;
    [key: string]: unknown;
}

/* eslint-disable react/display-name */
const Loadable = (Component: ComponentType) => {
    return ({ claims, ...props }: iLoadable) => {
        // if (claims) {
        //   return (
        //     <Suspense fallback={<Loader />}>
        //       <ClaimsGuard claims={claims}>
        //         <Component {...props} />
        //       </ClaimsGuard>
        //     </Suspense>
        //   );
        // }

        return (
            <Suspense /* fallback={<Loader />} */>
                <Component {...props} />
            </Suspense>
        );
    };
};

// ----------------------------------------------------------------------

//
// IMPORTS
//

// ----------------------------------------------------------------------

// Layouts
export const MainLayout = Loadable(lazy(() => import('../layouts/Main')));
export const AuthLayout = Loadable(lazy(() => import('../layouts/Auth')));

// Auth
export const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')));

// Home
export const HomePage = Loadable(lazy(() => import('../pages/Home')));
export const BoardPage = Loadable(lazy(() => import('../pages/Board')));
export const CommitteePage = Loadable(lazy(() => import('../pages/Committee')));
export const CoordinatorPage = Loadable(lazy(() => import('../pages/Coordinator')));
export const MeetingPage = Loadable(lazy(() => import('../pages/Meeting')));
export const MemberPage = Loadable(lazy(() => import('../pages/Member')));
export const MembershipPage = Loadable(lazy(() => import('../pages/Membership')));

// Board and coordinators
export const BoardAndCoordinatorsListPage = Loadable(lazy(() => import('../pages/boardAndCoordinators/List')));
export const BoardAndCoordinatorsViewPage = Loadable(lazy(() => import('../pages/boardAndCoordinators/View')));
export const BoardAndCoordinatorsEditPage = Loadable(lazy(() => import('../pages/boardAndCoordinators/Edit')));

// Error
export const ErrorPage = Loadable(lazy(() => import('../pages/error/Error')));

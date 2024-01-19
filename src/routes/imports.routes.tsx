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
export const MainLayout = Loadable(lazy(() => import('../layouts/Main.layout')));

// Home
export const HomePage = Loadable(lazy(() => import('../pages/Home.page')));
export const BoardPage = Loadable(lazy(() => import('../pages/Board.page')));
export const CommitteePage = Loadable(lazy(() => import('../pages/Committee.page')));
export const CoordinatorPage = Loadable(lazy(() => import('../pages/Coordinator.page')));
export const MeetingPage = Loadable(lazy(() => import('../pages/Meeting.page')));
export const MemberPage = Loadable(lazy(() => import('../pages/Member.page')));
export const MembershipPage = Loadable(lazy(() => import('../pages/Membership.page')));

// Error
export const ErrorPage = Loadable(lazy(() => import('../pages/error/Error.page')));

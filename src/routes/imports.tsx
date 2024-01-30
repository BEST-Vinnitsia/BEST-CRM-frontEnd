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
export const DashboardLayout = Loadable(lazy(() => import('../layouts/Dashboard')));
export const AuthorizationLayout = Loadable(lazy(() => import('../layouts/Authorization')));

//
// PAGES
//

// Auth
export const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')));
// export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/...')));
// export const CodeVerifyPage = Loadable(lazy(() => import('../pages/auth/...')));

// Dashboard
export const DashboardPage = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

// Board and coordinators
export const BoardAndCoordinatorsListPage = Loadable(lazy(() => import('../pages/boardAndCoordinators/List')));
export const BoardAndCoordinatorsDetailPage = Loadable(lazy(() => import('../pages/boardAndCoordinators/Detail')));
export const BoardAndCoordinatorsEditPage = Loadable(lazy(() => import('../pages/boardAndCoordinators/Edit')));

// Committee
export const CommitteeListPage = Loadable(lazy(() => import('../pages/committee/List')));
export const CommitteeDetailPage = Loadable(lazy(() => import('../pages/committee/Detail')));
export const CommitteeEditPage = Loadable(lazy(() => import('../pages/committee/Edit')));

// Membership
export const MemberListPage = Loadable(lazy(() => import('../pages/member/List')));
export const MemberDetailPage = Loadable(lazy(() => import('../pages/member/Detail')));
export const MemberEditPage = Loadable(lazy(() => import('../pages/member/Edit')));

// Membership
export const MembershipListPage = Loadable(lazy(() => import('../pages/membership/List')));
export const MembershipDetailPage = Loadable(lazy(() => import('../pages/membership/Detail')));
export const MembershipEditPage = Loadable(lazy(() => import('../pages/membership/Edit')));

// Event
export const EventListPage = Loadable(lazy(() => import('../pages/event/List')));
export const EventDetailPage = Loadable(lazy(() => import('../pages/event/Detail')));
export const EventEditPage = Loadable(lazy(() => import('../pages/event/Edit')));

// Error
export const ErrorPage = Loadable(lazy(() => import('../pages/error/Error')));

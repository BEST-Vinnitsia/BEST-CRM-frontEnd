import React, { ComponentType, lazy, Suspense } from 'react';

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

// Dashboard
export const DashboardPage = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

// Auth
export const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')));
// export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/...')));
// export const CodeVerifyPage = Loadable(lazy(() => import('../pages/auth/...')));

// Error
export const ErrorPage = Loadable(lazy(() => import('../pages/error/Error')));

// EVENT
export const EventListPage = Loadable(lazy(() => import('../pages/event/List')));
export const EventDetailPage = Loadable(lazy(() => import('../pages/event/Detail')));
export const EventEditPage = Loadable(lazy(() => import('../pages/event/Edit')));
export const EventCategoryListPage = Loadable(lazy(() => import('../pages/event/category/List')));
export const EventCategoryDetailPage = Loadable(lazy(() => import('../pages/event/category/Detail')));
export const EventCategoryEditPage = Loadable(lazy(() => import('../pages/event/category/Edit')));

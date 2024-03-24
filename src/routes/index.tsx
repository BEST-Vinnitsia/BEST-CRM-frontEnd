import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ERROR, PATH_EVENT } from './paths';
import { AuthGuard, GuestGuard } from '../guards';
// import { Claims } from '../config/claims';
import {
    AuthorizationLayout,
    DashboardLayout,
    DashboardPage,
    ErrorPage,
    EventCategoryDetailPage,
    EventCategoryEditPage,
    EventCategoryListPage,
    EventDetailPage,
    EventEditPage,
    EventListPage,
    LoginPage,
} from './imports';

export default function Router() {
    return useRoutes([
        // Auth
        {
            path: PATH_AUTH.ROOT,
            element: <GuestGuard children={<AuthorizationLayout />} />,
            children: [
                { path: PATH_AUTH.LOGIN, element: <LoginPage /> }, //
            ],
        },

        // Dashboard
        {
            path: PATH_DASHBOARD.ROOT,
            element: <AuthGuard children={<DashboardLayout />} />,
            children: [
                { path: PATH_DASHBOARD.ROOT, element: <DashboardPage /> }, //
            ],
        },

        // Event
        {
            path: PATH_EVENT.ROOT,
            element: <AuthGuard children={<DashboardLayout />} />,
            children: [
                { path: PATH_EVENT.LIST, element: <EventListPage /> },
                { path: PATH_EVENT.CREATE, element: <EventEditPage /> },
                { path: `${PATH_EVENT.EDIT}/:id`, element: <EventEditPage /> },
                { path: `${PATH_EVENT.DETAILS}/:id`, element: <EventDetailPage /> },
                {
                    path: PATH_EVENT.CATEGORY.ROOT,
                    children: [
                        { path: PATH_EVENT.CATEGORY.LIST, element: <EventCategoryListPage /> },
                        { path: PATH_EVENT.CATEGORY.CREATE, element: <EventCategoryEditPage /> },
                        { path: `${PATH_EVENT.CATEGORY.EDIT}/:id`, element: <EventCategoryEditPage /> },
                        { path: `${PATH_EVENT.CATEGORY.DETAILS}/:id`, element: <EventCategoryDetailPage /> },
                    ],
                },
            ],
        },

        // Error routes
        { path: 'error/:code', element: <ErrorPage /> },

        // Other routes
        { path: '/', element: <Navigate to={PATH_DASHBOARD.ROOT} replace /> },
        { path: '*', element: <Navigate to={PATH_ERROR[404]} replace /> },
    ]);
}

import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
    PATH_AUTH,
    PATH_BaC,
    PATH_COMMITTEE,
    PATH_DASHBOARD,
    PATH_ERROR,
    PATH_EVENT,
    PATH_MEMBER,
    PATH_MEMBERSHIP,
} from './paths';

// Guard
import { AuthGuard, GuestGuard } from '../guards';
// import { Claims } from '../config/claims';
// Imports
import {
    AuthorizationLayout,
    BoardAndCoordinatorsDetailPage,
    BoardAndCoordinatorsEditPage,
    BoardAndCoordinatorsListPage,
    CommitteeDetailPage,
    CommitteeEditPage,
    CommitteeListPage,
    DashboardLayout,
    DashboardPage,
    ErrorPage,
    EventDetailPage,
    EventEditPage,
    EventListPage,
    LoginPage,
    MemberDetailPage,
    MemberEditPage,
    MemberListPage,
    MembershipDetailPage,
    MembershipEditPage,
    MembershipListPage,
} from './imports';

export default function Router() {
    return useRoutes([
        // Auth
        {
            path: PATH_AUTH.ROOT,
            element: (
                <GuestGuard>
                    <AuthorizationLayout />
                </GuestGuard>
            ),
            children: [{ path: PATH_AUTH.LOGIN, element: <LoginPage /> }],
        },

        // Dashboard
        {
            path: PATH_DASHBOARD.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [{ path: PATH_DASHBOARD.ROOT, element: <DashboardPage /> }],
        },

        // Board and coordinators
        {
            path: PATH_BaC.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_BaC.LIST, element: <BoardAndCoordinatorsListPage /> },
                { path: PATH_BaC.CREATE, element: <BoardAndCoordinatorsEditPage /> },
                {
                    path: `${PATH_BaC.EDIT}/:id`,
                    element: <BoardAndCoordinatorsEditPage />,
                },
                {
                    path: `${PATH_BaC.DETAILS}/:id`,
                    element: <BoardAndCoordinatorsDetailPage />,
                },
            ],
        },

        // Committee
        {
            path: PATH_COMMITTEE.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_COMMITTEE.LIST, element: <CommitteeListPage /> },
                { path: PATH_COMMITTEE.CREATE, element: <CommitteeEditPage /> },
                { path: `${PATH_COMMITTEE.EDIT}/:id`, element: <CommitteeEditPage /> },
                {
                    path: `${PATH_COMMITTEE.DETAILS}/:id`,
                    element: <CommitteeDetailPage />,
                },
            ],
        },

        // Member
        {
            path: PATH_MEMBER.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_MEMBER.LIST, element: <MemberListPage /> },
                { path: PATH_MEMBER.CREATE, element: <MemberEditPage /> },
                { path: `${PATH_MEMBER.EDIT}/:id`, element: <MemberEditPage /> },
                { path: `${PATH_MEMBER.DETAILS}/:id`, element: <MemberDetailPage /> },
            ],
        },

        // Membership
        {
            path: PATH_MEMBERSHIP.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_MEMBERSHIP.LIST, element: <MembershipListPage /> },
                { path: PATH_MEMBERSHIP.CREATE, element: <MembershipEditPage /> },
                {
                    path: `${PATH_MEMBERSHIP.EDIT}/:id`,
                    element: <MembershipEditPage />,
                },
                {
                    path: `${PATH_MEMBERSHIP.DETAILS}/:id`,
                    element: <MembershipDetailPage />,
                },
            ],
        },

        // Event
        {
            path: PATH_EVENT.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_EVENT.LIST, element: <EventListPage /> },
                { path: PATH_EVENT.CREATE, element: <EventEditPage /> },
                { path: `${PATH_EVENT.EDIT}/:id`, element: <EventEditPage /> },
                { path: `${PATH_EVENT.DETAILS}/:id`, element: <EventDetailPage /> },
            ],
        },

        // Error routes
        { path: 'error/:code', element: <ErrorPage /> },

        // Other routes
        { path: '/', element: <Navigate to={PATH_DASHBOARD.ROOT} replace /> },
        { path: '*', element: <Navigate to={PATH_ERROR[404]} replace /> },
    ]);
}

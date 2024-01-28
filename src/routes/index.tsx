import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
    PATH_DASHBOARD,
    PATH_AUTH,
    PATH_BaC,
    PATH_COMMITTEE,
    PATH_ERROR,
    PATH_MEMBER,
    PATH_MEMBERSHIP,
    PATH_EVENT,
} from './paths';

// Guard
import { AuthGuard, ClaimGuard, GuestGuard } from '../guards';
// import { Claims } from '../config/claims';

// Imports
import {
    // Layout
    DashboardLayout,
    AuthorizationLayout,

    //
    // PAGES
    //

    // Auth
    LoginPage,

    // Dashboard
    DashboardPage,

    // Board and coordinators
    BoardAndCoordinatorsEditPage,
    BoardAndCoordinatorsListPage,
    BoardAndCoordinatorsDetailPage,

    // Committee
    CommitteeDetailPage,
    CommitteeEditPage,
    CommitteeListPage,

    // Membership
    MemberListPage,
    MemberDetailPage,
    MemberEditPage,

    // Membership
    MembershipListPage,
    MembershipDetailPage,
    MembershipEditPage,

    // Event
    EventListPage,
    EventDetailPage,
    EventEditPage,

    // Error
    ErrorPage,
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
                { path: `${PATH_BaC.EDIT}/:id`, element: <BoardAndCoordinatorsEditPage /> },
                { path: `${PATH_BaC.DETAILS}/:id`, element: <BoardAndCoordinatorsDetailPage /> },
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
                { path: `${PATH_COMMITTEE.DETAILS}/:id`, element: <CommitteeDetailPage /> },
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
                { path: `${PATH_MEMBER.DETAILS}/:id`, element: <MemberListPage /> },
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
                { path: `${PATH_MEMBERSHIP.EDIT}/:id`, element: <MembershipEditPage /> },
                { path: `${PATH_MEMBERSHIP.DETAILS}/:id`, element: <MembershipDetailPage /> },
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

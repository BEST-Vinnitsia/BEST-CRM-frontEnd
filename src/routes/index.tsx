import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
    PATH_AUTH,
    PATH_BaC,
    PATH_COMMITTEE,
    PATH_ERROR,
    PATH_HOME,
    PATH_MEETING,
    PATH_MEMBER,
    PATH_MEMBERSHIP,
} from './paths';

// Guard
import { AuthGuard, ClaimGuard, GuestGuard } from '../guards';

// Imports
import {
    // Layout
    MainLayout,
    AuthLayout,

    // Pages
    LoginPage,
    HomePage,
    BoardPage,
    CommitteePage,
    CoordinatorPage,
    MeetingPage,
    MemberPage,
    MembershipPage,
    BoardAndCoordinatorsEditPage,
    BoardAndCoordinatorsListPage,
    BoardAndCoordinatorsViewPage,

    // Error
    ErrorPage,
} from './imports';
// import { Claims } from '../config/claims';

export default function Router() {
    return useRoutes([
        // Auth
        {
            path: PATH_AUTH.ROOT,
            element: (
                <GuestGuard>
                    <AuthLayout />
                </GuestGuard>
            ),
            children: [
                { path: PATH_AUTH.LOGIN, element: <LoginPage /> },
                { path: PATH_AUTH.RESET, element: <></> },
            ],
        },

        // Home
        {
            path: '',
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: PATH_HOME.ROOT, element: <HomePage /> }],
        },

        // Board and coordinators
        {
            path: PATH_BaC.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_BaC.LIST, element: <BoardAndCoordinatorsListPage /> },
                { path: PATH_BaC.CREATE, element: <BoardAndCoordinatorsEditPage /> },
                { path: PATH_BaC.EDIT, element: <BoardAndCoordinatorsEditPage /> },
                { path: PATH_BaC.VIEW, element: <BoardAndCoordinatorsViewPage /> },
            ],
        },

        // Committee
        {
            path: PATH_COMMITTEE.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: PATH_COMMITTEE.ROOT, element: <CommitteePage /> }],
        },

        // Meeting
        {
            path: PATH_MEETING.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: PATH_MEETING.ROOT, element: <MeetingPage /> }],
        },

        // Member
        {
            path: PATH_MEMBER.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: PATH_MEMBER.ROOT, element: <MemberPage /> }],
        },

        // Membership
        {
            path: PATH_MEMBERSHIP.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: PATH_MEMBERSHIP.ROOT, element: <MembershipPage /> }],
        },

        // Error routes
        { path: 'error/:code', element: <ErrorPage /> },

        // Other routes
        { path: '/', element: <Navigate to={PATH_HOME.ROOT} replace /> },
        { path: '*', element: <Navigate to={PATH_ERROR[404]} replace /> },
    ]);
}

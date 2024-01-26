import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { PATH_BaC, PATH_COMMITTEE, PATH_ERROR, PATH_HOME, PATH_MEETING, PATH_MEMBER, PATH_MEMBERSHIP } from './paths';

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
            path: 'auth',
            element: (
                <GuestGuard>
                    <AuthLayout />
                </GuestGuard>
            ),
            children: [
                { path: 'login', element: <LoginPage /> },
                { path: 'reset-password', element: <></> },
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

        {
            path: PATH_BaC.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [
                { path: '', element: <BoardAndCoordinatorsListPage /> },
                { path: 'create', element: <BoardAndCoordinatorsEditPage /> },
                { path: 'edit', element: <BoardAndCoordinatorsEditPage /> },
                { path: 'view', element: <BoardAndCoordinatorsViewPage /> },
            ],
        },

        {
            path: PATH_COMMITTEE.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: '', element: <CommitteePage /> }],
        },

        {
            path: PATH_MEETING.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: '', element: <MeetingPage /> }],
        },

        {
            path: PATH_MEMBER.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [{ path: '', element: <MemberPage /> }],
        },

        {
            path: PATH_MEMBERSHIP.ROOT,
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [
                { path: '', element: <MembershipPage /> },
                { path: 'list', element: <MembershipPage /> },
            ],
        },

        // Error routes
        { path: 'error/:code', element: <ErrorPage /> },

        // Other routes
        { path: '/', element: <Navigate to={PATH_HOME.ROOT} replace /> },
        { path: '*', element: <Navigate to={PATH_ERROR[404]} replace /> },
    ]);
}

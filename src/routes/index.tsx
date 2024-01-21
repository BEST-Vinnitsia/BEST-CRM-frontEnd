import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
    PATH_BOARD,
    PATH_COMMITTEE,
    PATH_COORDINATOR,
    PATH_ERROR,
    PATH_HOME,
    PATH_MEETING,
    PATH_MEMBER,
    PATH_MEMBERSHIP,
} from './paths';

// Guard
// import AuthGuard from '../guards/auth.guard';
// import GuestGuard from '../guards/guest.guard';

// Imports
import {
    // Layout
    MainLayout,

    // Home
    HomePage,
    BoardPage,
    CommitteePage,
    CoordinatorPage,
    MeetingPage,
    MemberPage,
    MembershipPage,

    // Error
    ErrorPage,
} from './imports';
// import { Claims } from '../config/claims';

export default function Router() {
    return useRoutes([
        // Auth routes
        // {
        //   path: 'auth',
        //   element: (
        //     <GuestGuard>
        //       <AuthLayout />
        //     </GuestGuard>
        //   ),
        //   children: [
        //     { path: 'login', element: <LoginPage /> },
        //     { path: 'registration', element: <RegistrationPage /> },
        //   ],
        // },

        // Home
        {
            path: '',
            element: <MainLayout />,
            children: [{ path: PATH_HOME.ROOT, element: <HomePage /> }],
        },

        {
            path: PATH_BOARD.ROOT,
            element: <MainLayout />,
            children: [
                { path: '', element: <BoardPage /> },
                { path: 'create', element: <></> },
            ],
        },

        {
            path: PATH_COORDINATOR.ROOT,
            element: <MainLayout />,
            children: [{ path: '', element: <CoordinatorPage /> }],
        },

        {
            path: PATH_COMMITTEE.ROOT,
            element: <MainLayout />,
            children: [{ path: '', element: <CommitteePage /> }],
        },

        {
            path: PATH_MEETING.ROOT,
            element: <MainLayout />,
            children: [{ path: '', element: <MeetingPage /> }],
        },

        {
            path: PATH_MEMBER.ROOT,
            element: <MainLayout />,
            children: [{ path: '', element: <MemberPage /> }],
        },

        {
            path: PATH_MEMBERSHIP.ROOT,
            element: <MainLayout />,
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

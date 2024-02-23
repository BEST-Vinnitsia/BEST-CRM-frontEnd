import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
    PATH_AUTH,
    PATH_BaC,
    PATH_CADENCE,
    PATH_COMMITTEE,
    PATH_DASHBOARD,
    PATH_ERROR,
    PATH_EVENT,
    PATH_MEETING,
    PATH_MEMBER,
    PATH_NEW_EVENT,
    PATH_RESP,
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
    CadenceDetailPage,
    CadenceEditPage,
    CadenceListPage,
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
    MeetingDetailPage,
    MeetingEditPage,
    MeetingListPage,
    MemberDetailPage,
    MemberEditPage,
    MemberListPage,
    NewEventDetailPage,
    NewEventEditPage,
    ResponsibleDetailPage,
    ResponsibleEditPage,
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
                    path: `${PATH_BaC.EDIT}/:who/:id`,
                    element: <BoardAndCoordinatorsEditPage />,
                },
                {
                    path: `${PATH_BaC.DETAILS}/:who/:id`,
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

        // Cadence
        {
            path: PATH_CADENCE.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_CADENCE.LIST, element: <CadenceListPage /> },
                { path: PATH_CADENCE.CREATE, element: <CadenceEditPage /> },
                {
                    path: `${PATH_CADENCE.EDIT}/:id`,
                    element: <CadenceEditPage />,
                },
                {
                    path: `${PATH_CADENCE.DETAILS}/:id`,
                    element: <CadenceDetailPage />,
                },
            ],
        },

        // Meeting
        {
            path: PATH_MEETING.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_MEETING.LIST, element: <MeetingListPage /> },
                { path: PATH_MEETING.CREATE, element: <MeetingEditPage /> },
                {
                    path: `${PATH_MEETING.EDIT}/:id`,
                    element: <MeetingEditPage />,
                },
                {
                    path: `${PATH_MEETING.DETAILS}/:id`,
                    element: <MeetingDetailPage />,
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

        // New event
        {
            path: PATH_NEW_EVENT.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_NEW_EVENT.CREATE, element: <NewEventEditPage /> },
                { path: `${PATH_NEW_EVENT.EDIT}/:id`, element: <NewEventEditPage /> },
                { path: `${PATH_NEW_EVENT.DETAILS}/:id`, element: <NewEventDetailPage /> },
            ],
        },

        // Resp
        {
            path: PATH_RESP.ROOT,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { path: PATH_RESP.CREATE, element: <ResponsibleEditPage /> },
                { path: `${PATH_RESP.EDIT}/:id`, element: <ResponsibleEditPage /> },
                { path: `${PATH_RESP.DETAILS}/:id`, element: <ResponsibleDetailPage /> },
            ],
        },

        // Error routes
        { path: 'error/:code', element: <ErrorPage /> },

        // Other routes
        { path: '/', element: <Navigate to={PATH_DASHBOARD.ROOT} replace /> },
        { path: '*', element: <Navigate to={PATH_ERROR[404]} replace /> },
    ]);
}

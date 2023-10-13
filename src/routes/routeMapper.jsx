/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../components/shared/Loader/index';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Lazy-loaded Components
const Login = lazy(() => import('../components/auth/Login'));
const Dashboard = lazy(() => import('../components/dashboard/index'));
const NotFound = lazy(() => import('../components/shared/notFound'));
const User = lazy(() => import('../components/users/index'));

const routeMapper = () => {
    return [
        {
            path: '/login',
            element: (
                <PublicRoute>
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                </PublicRoute>
            ),
            exact: true,
        },
        {
            path: '/',
            element: (
                <PrivateRoute>
                    <Suspense fallback={<Loader />}>
                        <Dashboard />
                    </Suspense>
                </PrivateRoute>
            ),
            exact: true,
        },
        {
            path: '/user',
            element: (
                <PrivateRoute>
                    <Outlet />
                </PrivateRoute>
            ),
            exact: true,
            children: [
                {
                    index: true,
                    exact: true,
                    element: (
                        <Suspense fallback={<Loader />}>
                            <User />
                        </Suspense>
                    ),
                },
                {
                    path: ':action/:id',
                    exact: true,
                    element: (
                        <Suspense fallback={<Loader />}>
                            <User />
                        </Suspense>
                    ),
                }
            ],
        },
        {
            // Invalid Route
            path: '*',
            element: (
                <PrivateRoute>
                    <Suspense fallback={<Loader />}>
                        <NotFound />
                    </Suspense>
                </PrivateRoute>
            ),
        },
    ];
};

export default routeMapper;

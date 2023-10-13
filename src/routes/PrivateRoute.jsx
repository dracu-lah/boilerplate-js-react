// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/shared/Header';
import SideMenu from '../components/shared/sideMenu';

const PrivateLayout = ({ children }) => (
    <div >
        <Header />
        <div >
            <SideMenu />
            <main >
                {children}
            </main>
        </div>
    </div>
);

const PrivateRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('token')

    return isLoggedIn ? (
        <PrivateLayout>
            {children}
        </PrivateLayout>
    ) : (
        <Navigate to="/login" />
    )
}

export default PrivateRoute;

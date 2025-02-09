import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import dynamic from 'next/dynamic';

// Use dynamic imports for the components
const LoginPage = dynamic(() => import('../pages/LoginPage/LoginPage'));
const Page = dynamic(() => import('../app/login/page'));

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    
    console.log('PrivateRoute check:', { 
        isAuthenticated,
        hasToken: !!localStorage.getItem('authToken'),
        currentPath: location.pathname
    });
    
    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login...');
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    console.log('Authenticated, showing protected content');
    return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log('AppRoutes auth state:', { 
            isAuthenticated,
            hasToken: !!localStorage.getItem('authToken'),
            currentPath: location.pathname
        });
    }, [isAuthenticated, location]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
                <PrivateRoute>
                    <Page />
                </PrivateRoute>
            } />
            <Route path="/viewer" element={
                <PrivateRoute>
                    <Page />
                </PrivateRoute>
            } />
            
            {/* Default Route - Always redirect to login first */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch all unknown routes */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};



export default AppRoutes;

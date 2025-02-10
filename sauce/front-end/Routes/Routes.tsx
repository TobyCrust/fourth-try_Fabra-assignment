import React, { Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import dynamic from 'next/dynamic';

// Dynamically import pages
const Page = dynamic(() => import('../app/3Dpage/page'));
const LoginPage = dynamic(() => import('../app/loginPage/page'));

interface PrivateRouteProps {
    children: ReactNode;
}

// Private route component
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === undefined) return <></>; // Prevents rendering undefined JSX

    return isAuthenticated ? <>{children}</> : <Navigate to="/3Dpage" replace />;
};

// App routes component
const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public Route */}
                    <Route path="/loginPage" element={<LoginPage />} />

                    {/* Private Route */}
                    <Route 
                        path="/3Dpage" 
                        element={
                            <PrivateRoute>
                                <Page />
                            </PrivateRoute>
                        } 
                    />

                    {/* Redirect to 3D Page if Authenticated */}
                    <Route path="/" element={isAuthenticated ? <Navigate to="/3Dpage" replace /> : <Navigate to="/loginPage" replace />} />

                    {/* Catch-All Route */}
                    <Route path="*" element={<Navigate to="/3Dpage" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRoutes;

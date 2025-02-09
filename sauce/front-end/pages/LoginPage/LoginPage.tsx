import React, { useState } from 'react';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface LoginFormsInputs {
    username: string;
    password: string;
}

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const router = useRouter();
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormsInputs>({ 
        resolver: yupResolver(validation) 
    });

    const onSubmit = async (data: LoginFormsInputs) => {
        setError('');
        try {
            console.log('Attempting login with:', { username: data.username });
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                username: data.username,
                password: data.password,
            });

            console.log('Login response:', response.data);
            if (response.data && response.data.token) {
                login(response.data.token);
                localStorage.setItem('authToken', response.data.token);
                setShowSuccess(true);
                console.log('Login successful, redirecting in 2 seconds...');
                setTimeout(() => {
                    console.log('Redirecting now...');
                    router.push('/');  // Redirect directly to viewer instead of root
                }, 2000);
            } else {
                console.log('Invalid response:', response.data);
                setError('Invalid response from server');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (axios.isAxiosError(err)) {
                setError(`Login failed: ${err.response?.data?.message || err.message}`);
            } else {
                setError('Login failed. Please check your credentials.');
            }
        }
    };

    if (showSuccess) {
        return <div style={{ 
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '24px'
        }}>
            Login Success!
        </div>;
    }

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            backgroundColor: '#f5f5f5' 
        }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ 
                background: 'white', 
                padding: '2rem', 
                borderRadius: '8px', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                width: '100%', 
                maxWidth: '400px' 
            }}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={{ marginBottom: '1rem' }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        {...register("username")}
                        style={{ 
                            width: '100%', 
                            padding: '0.5rem', 
                            border: '1px solid #ddd', 
                            borderRadius: '4px' 
                        }}
                    />
                    {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register("password")}
                        style={{ 
                            width: '100%', 
                            padding: '0.5rem', 
                            border: '1px solid #ddd', 
                            borderRadius: '4px' 
                        }}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
                <button type="submit" style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    background: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    marginTop: '1rem' 
                }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
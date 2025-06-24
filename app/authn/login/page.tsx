'use client';
import { useState, useEffect } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    // Save token with expiration (e.g., 1 hour)
    const handleLogin = async () => {
        setError('');
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
            setToken(data.token);
            const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour
            localStorage.setItem('token', data.token);
            localStorage.setItem('token_expires_at', expiresAt.toString());
            window.location.href = '/restaurant';
        } else {
            setError(data.error || 'Login failed');
        }
    };

    // Check token expiration on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const expiresAt = localStorage.getItem('token_expires_at');
        if (storedToken && expiresAt && Date.now() < Number(expiresAt)) {
            setToken(storedToken);
            window.location.href = '/restaurant'; // Redirect if token exists and valid
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('token_expires_at');
            setToken('');
        }
    }, []);

    return (
        <div className="max-w-[380px] mx-auto mt-20 p-10 rounded-2xl shadow-2xl bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-950 flex flex-col gap-6 text-zinc-900 dark:text-zinc-100">
            <h2 className="text-center mb-4 text-3xl font-bold tracking-tight text-blue-700 dark:text-blue-400 drop-shadow">
                เข้าสู่ระบบ
            </h2>
            <div className="flex flex-col gap-4">
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="ชื่อผู้ใช้"
                    className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-base bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="รหัสผ่าน"
                    className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-base bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button
                    onClick={handleLogin}
                    className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-base shadow-md hover:shadow-lg transition"
                >
                    เข้าสู่ระบบ
                </button>
            </div>
            {error && (
                <p className="text-red-600 dark:text-red-400 text-center font-medium mt-2">
                    {error}
                </p>
            )}
            {token && (
                <p className="text-green-600 dark:text-green-400 text-center font-medium mt-2">
                    เข้าสู่ระบบสำเร็จ! โทเคน: {token}
                </p>
            )}
        </div>
    );
}

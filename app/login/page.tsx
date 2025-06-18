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
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('token_expires_at');
            setToken('');
        }
    }, []);

    return (
        <div className="max-w-[350px] mx-auto mt-16 p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-900 flex flex-col gap-4 text-zinc-900 dark:text-zinc-100">
            <h2 className="text-center mb-6 text-2xl font-semibold">เข้าสู่ระบบ</h2>
            <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="ชื่อผู้ใช้"
                className="p-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-base bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                className="p-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-base bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
            <button
                onClick={handleLogin}
                className="p-3 rounded-md border-none bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base cursor-pointer transition"
            >
                เข้าสู่ระบบ
            </button>
            {error && (
                <p className="text-red-600 dark:text-red-400 text-center">
                    {error}
                </p>
            )}
            {token && (
                <p className="text-green-600 dark:text-green-400 text-center">
                    เข้าสู่ระบบสำเร็จ! โทเคน: {token}
                </p>
            )}
        </div>
    );
}

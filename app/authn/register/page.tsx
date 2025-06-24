'use client';
import { useState } from 'react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError('');
        setSuccess('');
        if (password !== confirmPassword) {
            setError('รหัสผ่านไม่ตรงกัน');
            return;
        }
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
            setSuccess('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } else {
            setError(data.error || 'สมัครสมาชิกไม่สำเร็จ');
        }
    };

    // useEffect(() => {
    //     // Optional: redirect if already logged in
    //     const storedToken = localStorage.getItem('token');
    //     const expiresAt = localStorage.getItem('token_expires_at');
    //     if (storedToken && expiresAt && Date.now() < Number(expiresAt)) {
    //         window.location.href = '/restaurant';
    //     }
    // }, []);

    return (
        <div className="max-w-[350px] mx-auto mt-16 p-8 rounded-xl shadow-lg bg-white dark:bg-zinc-900 flex flex-col gap-4 text-zinc-900 dark:text-zinc-100">
            <h2 className="text-center mb-6 text-2xl font-semibold">สมัครสมาชิก</h2>
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
            <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="ยืนยันรหัสผ่าน"
                className="p-2.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-base bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            />
            <button
                onClick={handleRegister}
                className="p-3 rounded-md border-none bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base cursor-pointer transition"
            >
                สมัครสมาชิก
            </button>
            {error && (
                <p className="text-red-600 dark:text-red-400 text-center">
                    {error}
                </p>
            )}
            {success && (
                <p className="text-green-600 dark:text-green-400 text-center">
                    {success}
                </p>
            )}
        </div>
    );
}

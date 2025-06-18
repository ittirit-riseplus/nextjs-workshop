'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRestaurantPage() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAdd = async () => {
        if (!name || !image) return;
        setLoading(true);
        await fetch('/api/restaurant', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, image, description }),
        });
        setName('');
        setImage('');
        setDescription('');
        setLoading(false);
        router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">เพิ่มชื่ออาหาร</h1>
                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="ชื่ออาหาร"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={loading}
                />
                <input
                    className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="ลิงก์รูปภาพ"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    disabled={loading}
                />
                <textarea
                    className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="รายละเอียด"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    disabled={loading}
                    rows={4}
                />
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold transition disabled:opacity-50"
                        disabled={loading}
                    >
                        ย้อนกลับ
                    </button>
                    <button
                        onClick={handleAdd}
                        disabled={loading}
                        className="flex-1 py-2 rounded bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold transition disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                กำลังเพิ่ม...
                            </span>
                        ) : 'เพิ่ม'}
                    </button>
                </div>
            </div>
        </div>
    );
}

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
// Restaurant type
interface Restaurant {
    id: string;
    name: string;
    image: string;
    description?: string;
    created_at?: string;
    update_at?: string;
}

export default function RestaurantPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(false);

    // Auth state
    const [token, setToken] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const expiresAt = localStorage.getItem('token_expires_at');
        if (storedToken && expiresAt && Date.now() < Number(expiresAt)) {
            setToken(storedToken);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('token_expires_at');
            setToken('');
            router.replace('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires_at');
        setToken('');
        router.replace('/login');
    };

    const fetchData = async () => {
        setLoading(true);
        const res = await fetch('/api/restaurant', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        setRestaurants(data);
        setLoading(false);
    };

    useEffect(() => {
        if (token) fetchData();
    }, [token]);


    const handleDelete = async (id: string) => {
        setLoading(true);
        await fetch(`${'/api/restaurant'}/${id}`, { method: 'DELETE' });
        fetchData();
    };

    // State สำหรับค้นหา
    const [search, setSearch] = useState('');

    // ฟิลเตอร์ร้านอาหารตาม search
    const filteredRestaurants = restaurants.filter(rest =>
        rest.name.toLowerCase().includes(search.toLowerCase())
    );


    // รองรับ dark mode และอัปเดตเมื่อ theme เปลี่ยน
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        setIsDark(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <div className={`p-8 max-w-2xl mx-auto mt-10 rounded-2xl shadow-lg min-h-[600px] ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
            <div className="flex justify-between items-center mb-8">
                <div className="flex-1 flex justify-center">
                    <h1 className={`font-extrabold text-3xl sm:text-4xl text-center tracking-tight drop-shadow-lg ${isDark ? 'text-yellow-300' : 'text-gray-800'}`}>
                        🍽️ จัดการร้านอาหาร
                    </h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-transparent p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition"
                    title="ออกจากระบบ"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 17l5-5m0 0l-5-5m5 5H9m4 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v1" />
                    </svg>
                </button>
            </div>
            <div className="mb-6 flex justify-center">
                <input
                    placeholder="ค้นหาร้านอาหาร..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={`w-full max-w-md px-4 py-2 rounded-lg border text-base ${isDark ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-300 text-gray-800'}`}
                />
            </div>
            <div className="flex gap-3 mb-6 items-center flex-wrap justify-end">
                <button
                    onClick={() => router.push('/restaurant/add')}
                    className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold disabled:opacity-60 flex items-center justify-center"
                    disabled={loading}
                    title="เพิ่มอาหารใหม่"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    เพิ่มอาหารใหม่
                </button>
            </div>
            {loading && <div className="text-center text-gray-400 mb-4">กำลังโหลด...</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredRestaurants.map(rest => (
                    <div
                        key={rest.id}
                        className={`rounded-xl shadow-md p-5 flex flex-col items-center relative ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                    >
                        <div className="w-[120px] h-[120px] mb-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 flex items-center justify-center bg-white">
                            <Image
                                src="/img/food.jpg"
                                alt={rest.name}
                                width={800}
                                height={600}
                                className="object-cover w-full h-full"
                                style={{ aspectRatio: '1/1' }}
                                loading="lazy"
                            />
                        </div>
                        <div className={`text-lg font-semibold mb-1 text-center ${isDark ? 'text-yellow-300' : 'text-gray-800'}`}>
                            {rest.name}
                        </div>
                        <div className={`text-sm mb-2 text-center ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                            {rest.description || 'ร้านอาหารยอดนิยมในย่านนี้'}
                        </div>
                        <div className="text-xs text-gray-400 mb-4 text-center">
                            {rest.created_at && <>สร้างเมื่อ: {new Date(rest.created_at).toLocaleString()}<br /></>}
                            {rest.update_at && <>อัปเดตล่าสุด: {new Date(rest.update_at).toLocaleString()}</>}
                        </div>
                        <div className="flex gap-2 justify-center">
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => router.push(`/restaurant/view/${rest.id}`)}
                                    className="bg-blue-600 text-white rounded-lg px-3 py-2 font-medium hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center"
                                    disabled={loading}
                                    title="ดูรายละเอียด"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(rest.id)}
                                    className="bg-red-600 text-white rounded-lg px-3 py-2 font-medium hover:bg-red-700 transition disabled:opacity-60 flex items-center justify-center"
                                    disabled={loading}
                                    title="ลบ"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';

export interface Data {
    id: number
    name: string,
    email: string
}

export default function CSRExample() {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((res) => res.json())
            .then(setData);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                    <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">CSR</span>
                    User Profile
                </h1>
                {data ? (
                    <div>
                        <div className="mb-2">
                            <span className="font-semibold text-gray-700">User ID:</span>
                            <span className="ml-2 text-gray-900">{data.id}</span>
                        </div>
                        <div className="mb-2">
                            <span className="font-semibold text-gray-700">Name:</span>
                            <span className="ml-2 text-gray-900">{data.name}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Email:</span>
                            <span className="ml-2 text-gray-900">{data.email}</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-blue-500">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Loading...
                    </div>
                )}
            </div>
        </div>
    );
}

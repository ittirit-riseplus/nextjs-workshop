'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export default function CSRDynamicPage() {
    const { id } = useParams();
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(setData);
    }, [id]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-blue-100">
                {data ? (
                    <>
                        <h1 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
                            {data.name}
                        </h1>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center">
                                <span className="w-32 font-semibold text-gray-600">User ID:</span>
                                <span className="text-gray-900">{data.id}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-32 font-semibold text-gray-600">Username:</span>
                                <span className="text-gray-900">{data.username}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-32 font-semibold text-gray-600">Email:</span>
                                <a href={`mailto:${data.email}`} className="text-blue-700 underline">{data.email}</a>
                            </div>
                            <div className="flex items-center">
                                <span className="w-32 font-semibold text-gray-600">Phone:</span>
                                <a href={`tel:${data.phone}`} className="text-gray-900">{data.phone}</a>
                            </div>
                            <div className="flex items-center">
                                <span className="w-32 font-semibold text-gray-600">Website:</span>
                                <a href={`http://${data.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{data.website}</a>
                            </div>
                            {data.address && (
                                <div>
                                    <span className="font-semibold text-gray-600">Address:</span>
                                    <div className="ml-4 text-gray-900 text-sm">
                                        <div>{data.address.street}{data.address.suite && `, ${data.address.suite}`}</div>
                                        <div>{data.address.city}{data.address.zipcode && `, ${data.address.zipcode}`}</div>
                                        {(data.address.geo.lat || data.address.geo.lng) && (
                                            <div>
                                                <span className="text-gray-500">Geo:</span> {data.address.geo.lat}, {data.address.geo.lng}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {data.company && (
                                <div>
                                    <span className="font-semibold text-gray-600">Company:</span>
                                    <div className="ml-4 text-gray-900 text-sm">
                                        <div className="font-bold">{data.company.name}</div>
                                        {data.company.catchPhrase && (
                                            <div className="italic text-indigo-600">{data.company.catchPhrase}</div>
                                        )}
                                        {data.company.bs && (
                                            <div className="text-xs text-gray-400">{data.company.bs}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-32">
                        <span className="text-gray-500 animate-pulse">Loading...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

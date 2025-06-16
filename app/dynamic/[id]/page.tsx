'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface User {
    id: number
    name: string
    email: string
}

export default function CSRDynamicPage() {
    const { id } = useParams();
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(setData);
    }, [id]);

    return data ? (
        <div>
            <h1>User ID: {id}</h1>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

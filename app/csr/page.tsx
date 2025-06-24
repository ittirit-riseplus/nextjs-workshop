'use client';

import { useEffect, useState } from 'react';

type HelloResponse = {
    message: string;
}


export default function CSRExample() {

    const helo = 'Hello World';
    const [heloData, setHeloData] = useState<HelloResponse | null>(null);
    const fetchData = async () => {
        const res = await fetch('/api/hello', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        console.log('data res :', data.message);
        console.log('res :', data);

        setHeloData(data);

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 16, color: '#0070f3' }}>
                {helo}
            </h1>
            <div style={{
                background: '#f0f4f8',
                padding: '24px 32px',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                minWidth: 320,
                textAlign: 'center'
            }}>
                <span style={{ fontSize: '1.25rem', color: '#333' }}>
                    {heloData?.message ? heloData.message : 'Loading...'}
                </span>
            </div>
        </div>
    );
}

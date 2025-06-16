// 🔸 ต้องมี "use client" บนสุดของไฟล์
// 🔸 ใช้ useState, useEffect เพื่อ fetch ข้อมูลหลังโหลด

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

    return data ? (
        <div>
            <h1>User ID: {1}</h1>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

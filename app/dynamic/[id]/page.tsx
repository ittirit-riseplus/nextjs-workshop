'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";


export interface Post {
    title: string;
    body: string;
    id: number;
    userId: number;
}

export default function CSRDynamicPage() {
    const { id } = useParams();
    const [data, setData] = useState<Post | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(setData);
    }, [id]);

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-4'>CSR Dynamic Page</h1>
            <h1 className='font-mono text-2xl font-bold text-blue-600 text-center mt-1 flex items-center justify-center'>
                {data?.title}
            </h1>
            <h2 className='text-gray-700 text-lg mt-4 text-center'>
                {data?.body}
            </h2>
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                alt="Google Logo"
                width={272}
                height={92}
            />
        </div>
    );
}

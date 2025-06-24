'use client';

import { useEffect, useState } from "react";

type User = {
    name: string
    age: number
}


export default function StateExample() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        setUser({ name: 'Nest', age: 30 });
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <div>

        </div>
    );
}
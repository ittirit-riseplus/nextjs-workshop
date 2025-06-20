'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Textarea from '@/app/components/form/text-area';
import TextInput from '@/app/components/form/text-input';
import Button from '@/app/components/ui/button';

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

    // You may need to import useTheme or define isDark based on your app's theme logic
    // Example: const { isDark } = useTheme();
    // For now, let's assume isDark is always false
    const isDark = false;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">เพิ่มชื่ออาหาร</h1>
                <TextInput
                    label="ชื่ออาหาร"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ชื่ออาหาร"
                    customClassName={`w-100 px-3 py-2 rounded-lg border text-base ${isDark
                        ? "bg-gray-800 border-gray-700 text-gray-100"
                        : "bg-white border-gray-300 text-gray-800"
                        }`}
                    disabled={loading}
                />
                <TextInput
                    label="URL รูปร้าน/อาหาร"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="URL รูปร้าน/อาหาร"
                    customClassName={`w-100  px-3 py-2 rounded-lg border text-base ${isDark
                        ? "bg-gray-800 border-gray-700 text-gray-100"
                        : "bg-white border-gray-300 text-gray-800"
                        }`}
                    disabled={loading}
                />
                <Textarea
                    label="รายละเอียดร้านอาหาร"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="รายละเอียดร้านอาหาร"
                    className={` w-100  px-3 py-2 rounded-lg border text-base ${isDark
                        ? "bg-gray-800 border-gray-700 text-gray-100"
                        : "bg-white border-gray-300 text-gray-800"
                        }`}
                    disabled={loading}
                    rows={4}
                />
                <div className="flex gap-2 mt-4">
                    <Button
                        label="บันทึก"
                        onClick={handleAdd}
                        variant="primary"
                        customClassName="bg-green-600 text-white rounded-lg px-5 py-2 font-semibold disabled:opacity-60 flex-1"
                        disabled={loading}
                    />
                    <Button
                        label="ยกเลิก"
                        onClick={() => router.back()}
                        customClassName="bg-gray-400 text-white rounded-lg px-5 py-2 font-semibold flex-1"
                        variant="secondary"
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
}

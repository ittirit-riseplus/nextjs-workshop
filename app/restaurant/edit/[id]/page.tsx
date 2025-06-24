'use client';
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/ui/button";
import Textarea from "@/app/components/form/text-area";
import TextInput from "@/app/components/form/text-input";

type Restaurant = {
    id: string;
    name: string;
    image: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
};

const fetchRestaurant = async (id: string): Promise<Restaurant | null> => {
    try {
        const res = await fetch(`/api/restaurant/${id}`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
};

const updateRestaurant = async (
    id: string,
    data: { name: string; image: string; description?: string }
): Promise<Restaurant | null> => {
    try {
        const res = await fetch(`/api/restaurant/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
};

export default function RestaurantEditPage() {
    const router = useRouter();
    const params = useParams();
    const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isDark, setIsDark] = useState<boolean>(false);

    // ฟิลด์สำหรับแก้ไข
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        if (!id) return;
        setLoading(true);
        fetchRestaurant(id).then((rest) => {
            setRestaurant(rest);
            setName(rest?.name || "");
            setImage(rest?.image || "");
            setDescription(rest?.description || "");
            setLoading(false);
        });
    }, [id]);

    const handleSave = async () => {
        setLoading(true);
        const updated = await updateRestaurant(id, { name, image, description });
        setLoading(false);
        if (updated) {
            router.push(`/restaurant/view/${id}`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-gray-400">
                กำลังโหลด...
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-red-500">
                ไม่พบข้อมูลอาหารอาหาร
            </div>
        );
    }

    return (
        <div
            className={`p-8 max-w-xl mx-auto mt-10 rounded-2xl shadow-lg min-h-[400px] ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
                }`}
        >
            <h1 className="text-2xl font-bold mb-6 text-center">แก้ไขข้อมูลอาหารอาหาร</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div className="flex flex-col items-center">
                    <div className="w-[180px] h-[180px] mb-5 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-white flex items-center justify-center">
                        {image?.trim() ? (
                            <Image
                                src={image?.trim() || "/no-image.png"}
                                alt={name}
                                className="object-cover w-full h-full"
                                style={{ aspectRatio: "1/1" }}
                                width={180}
                                height={180}
                                unoptimized
                            />
                        ) : (
                            <Image
                                src="/no-image.png"
                                alt="No image"
                                className="object-cover w-full h-full"
                                style={{ aspectRatio: "1/1" }}
                                width={180}
                                height={180}
                                unoptimized
                            />
                        )}
                    </div>
                    <div className="w-full mb-4">
                        <TextInput
                            label="ชื่ออาหาร"
                            customClassName="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="w-full mb-4">
                        <TextInput
                            label="Image URL"
                            customClassName="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                    </div>
                    <div className="w-full mb-4">
                        <Textarea
                            label="รายละเอียด"
                            className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8 gap-4">
                    <Button
                        label="บันทึก"
                        type="submit"
                        disabled={loading}
                        customClassName={`rounded-lg px-5 py-2 font-semibold ${isDark ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500" : "bg-yellow-300 text-gray-800 hover:bg-yellow-400"}`}
                    />
                    <Button
                        label="ยกเลิก"
                        type="button"
                        onClick={() => router.push(`/restaurant/view/${restaurant.id}`)}
                        variant="secondary"
                        customClassName={`rounded-lg px-5 py-2 font-semibold ${isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                    />
                </div>
            </form>
        </div>
    );
}

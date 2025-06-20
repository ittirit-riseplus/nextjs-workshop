'use client';
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/ui/button";

type Restaurant = {
    id: string;
    name: string;
    image: string;
    description?: string;
    created_at?: string;
    update_at?: string;
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


export default function RestaurantPage() {
    const router = useRouter();
    const params = useParams();
    const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(false);


    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
        }
        if (!id) return;
        setLoading(true);
        fetchRestaurant(id).then((rest) => {
            setRestaurant(rest);
            setLoading(false);
        });
    }, [id]);


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
                ไม่พบข้อมูลร้านอาหาร
            </div>
        );
    }

    return (
        <div
            className={`p-8 max-w-xl mx-auto mt-10 rounded-2xl shadow-lg min-h-[400px] ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
                }`}
        >
            <div className="flex flex-col items-center">
                <div className="w-[180px] h-[180px] mb-5 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-white flex items-center justify-center">
                    {restaurant.image?.trim() ? (
                        <>
                            <Image
                                src={restaurant.image?.trim() || "/no-image.png"}
                                alt={restaurant.name}
                                className="object-cover w-full h-full"
                                style={{ aspectRatio: "1/1" }}
                                width={180}
                                height={180}
                                unoptimized
                            />
                            {/* Optionally, you can show the spinner only while loading */}
                        </>
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
                <div
                    className={`text-xl font-bold mb-2 text-center ${isDark ? "text-yellow-300" : "text-gray-800"
                        }`}
                >
                    {restaurant.name}
                </div>
                <div
                    className={`text-base text-center mb-4 ${isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                >
                    {restaurant.description || "ร้านอาหารยอดนิยมในย่านนี้"}
                    <br />
                    <span className="text-xs text-gray-400">
                        {restaurant.created_at && (
                            <>สร้างเมื่อ: {new Date(restaurant.created_at).toLocaleString()}<br /></>
                        )}
                        {restaurant.update_at && (
                            <>อัปเดตล่าสุด: {new Date(restaurant.update_at).toLocaleString()}</>
                        )}
                    </span>
                </div>
            </div>
            {/* ปุ่มอยู่ตรงกลางด้านล่าง */}
            <div className="flex justify-center items-center mt-8 gap-4">
                <Button
                    label="แก้ไข"
                    onClick={() => router.push(`/restaurant/edit/${restaurant.id}`)}
                    customClassName={`rounded-lg px-5 py-2 font-semibold ${isDark ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500" : "bg-yellow-300 text-gray-800 hover:bg-yellow-400"}`}
                />
                <Button
                    label="ย้อนกลับ"
                    onClick={() => router.push("/restaurant")}
                    variant="secondary"
                    customClassName={`rounded-lg px-5 py-2 font-semibold ${isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                />
            </div>
        </div>
    );
}
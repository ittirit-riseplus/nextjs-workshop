'use client';
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

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

const updateRestaurant = async (id: string, data: Partial<Restaurant>) => {
    const res = await fetch(`/api/restaurant/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await res.json();
};

export default function RestaurantPage() {
    const router = useRouter();
    const params = useParams();
    const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDark, setIsDark] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
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
        setRestaurant(updated as Restaurant);
        setEditMode(false);
        setLoading(false);
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
                ไม่พบข้อมูลร้านอาหาร
            </div>
        );
    }

    return (
        <div
            className={`p-8 max-w-xl mx-auto mt-10 rounded-2xl shadow-lg min-h-[400px] ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
                }`}
        >
            <div className="flex justify-between items-center mb-8">
                <h1
                    className={`font-bold text-2xl flex-1 text-center ${isDark ? "text-yellow-300" : "text-gray-800"}`}
                >
                    🍽️ รายละเอียดอาหาร
                </h1>
                <button
                    onClick={() => router.push("/restaurant")}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300 transition"
                    aria-label="กลับ"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-[180px] h-[180px] mb-5 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 bg-white flex items-center justify-center">
                    <Image
                        src={editMode ? image : restaurant.image}
                        alt={editMode ? name : restaurant.name}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full"
                        style={{ aspectRatio: "1/1" }}
                        loading="lazy"
                    />
                </div>
                {editMode ? (
                    <div className="w-full max-w-sm flex flex-col gap-4">
                        <input
                            className={`px-3 py-2 rounded-lg border text-base ${isDark
                                ? "bg-gray-800 border-gray-700 text-gray-100"
                                : "bg-white border-gray-300 text-gray-800"
                                }`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="ชื่อร้าน"
                        />
                        <input
                            className={`px-3 py-2 rounded-lg border text-base ${isDark
                                ? "bg-gray-800 border-gray-700 text-gray-100"
                                : "bg-white border-gray-300 text-gray-800"
                                }`}
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="URL รูปร้าน/อาหาร"
                        />
                        <textarea
                            className={`px-3 py-2 rounded-lg border text-base ${isDark
                                ? "bg-gray-800 border-gray-700 text-gray-100"
                                : "bg-white border-gray-300 text-gray-800"
                                }`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="รายละเอียดร้านอาหาร"
                        />
                        <div className="flex gap-2"></div>
                        <button
                            onClick={handleSave}
                            className="bg-green-600 text-white rounded-lg px-5 py-2 font-semibold disabled:opacity-60"
                            disabled={loading}
                        >
                            บันทึก
                        </button>
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-gray-400 text-white rounded-lg px-5 py-2 font-semibold"
                        >
                            ยกเลิก
                        </button>
                    </div>
                ) : (
                    <>
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
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-yellow-300 text-gray-800 rounded-lg px-5 py-2 font-semibold"
                        >
                            แก้ไข
                        </button>
                    </>
                )}
            </div>
        </div >
    );
}
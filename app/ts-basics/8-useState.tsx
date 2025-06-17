import { useState } from "react";

type User = {
  id: number;
  name: string;
};

export default function StateExample() {
  const [count, setCount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>เพิ่ม</button>

      <p>User: {user ? user.name : "ยังไม่มีข้อมูล"}</p>
      <button
        onClick={() =>
          setUser({ id: 1, name: "Nest" })
        }
      >
        โหลดข้อมูล User
      </button>
    </div>
  );
}

'use client'
import { useState } from 'react'

export default function ToggleMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'ซ่อนเมนู' : 'แสดงเมนู'}
            </button>
            {isOpen && (
                <ul>
                    <li>หน้าแรก</li>
                    <li>เกี่ยวกับ</li>
                    <li>ติดต่อ</li>
                </ul>
            )}
        </div>
    )
}

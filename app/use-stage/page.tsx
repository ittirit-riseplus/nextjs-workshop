'use client'
import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            fontFamily: 'sans-serif',
            background: '#f5f5f5'
        }}>
            <div style={{
                background: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                borderRadius: '1rem',
                padding: '2rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                minWidth: '300px'
            }}>
                <h1 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>Count: {count}</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setCount(count + 1)}
                        style={{
                            padding: '0.5rem 1.5rem',
                            fontSize: '1rem',
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        เพิ่ม
                    </button>
                    <button
                        onClick={() => setCount(count - 1)}
                        style={{
                            padding: '0.5rem 1.5rem',
                            fontSize: '1rem',
                            background: '#F44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        ลด
                    </button>
                </div>
            </div>
        </div>
    )
}

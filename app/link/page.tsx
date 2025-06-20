import Link from 'next/link';

export default function HomePage() {
    return (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '80vh', justifyContent: 'center', background: '#f9fafb' }}>
            <div style={{ background: '#fff', padding: '2rem 3rem', borderRadius: '1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <h1 style={{ marginBottom: '1.5rem', color: '#222', fontSize: '2.5rem', fontWeight: 700 }}>หน้าแรก</h1>
                <Link
                    href="/"
                    style={{
                        display: 'inline-block',
                        padding: '0.75rem 2rem',
                        background: '#2563eb',
                        color: '#fff',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                        transition: 'background 0.2s',
                        marginRight: '1rem',
                    }}
                >
                    ไปหน้าหลัก (Link)
                </Link>
            </div>
        </main>
    );
}
// 🔸 ใช้ getServerSideProps() แบบ Pages Router หรือ
// 🔸 ใช้ async function แบบ App Router(แนะนำ)

// SSR โดยใช้ async function
export default async function SSRExample() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await res.json();

    return (
        <div>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Company: {user.company?.name}</p>
        </div>
    );
}

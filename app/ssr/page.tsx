// SSR โดยใช้ async function
export default async function SSRExample() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await res.json();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                    <span className="inline-block bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold">SSR</span>
                    User Profile
                </h1>
                <div>
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">User ID:</span>
                        <span className="ml-2 text-gray-900">{user.id}</span>
                    </div>
                    <div className="mb-2">
                        <span className="font-semibold text-gray-700">Name:</span>
                        <span className="ml-2 text-gray-900">{user.name}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-900">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

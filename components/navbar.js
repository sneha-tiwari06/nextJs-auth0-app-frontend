import { useUser } from "@auth0/nextjs-auth0";

export default function Navbar() {
    const { user } = useUser();

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#ddd" }}>
            <a href="/">Home</a>
            {user ? (
                <>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/api/auth/logout">Logout</a>
                </>
            ) : (
                <a href="/api/auth/login">Login</a>
            )}
        </nav>
    );
}

import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import Navbar from "../components/navbar";

export default function Home() {
    const { user } = useUser(); 
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            if (user) {
                try {
                    const response = await axios.get("/api/token");
                    setToken(response.data.token);
                    await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/callback`,
                        { token: response.data.token, email: user.email }
                    );

                } catch (err) {
                    console.error("❌ Error fetching token:", err);
                }
            }
        };

        fetchToken();
    }, [user]);

    return (
        <div>
        <Navbar />
        <h1 className="text-2xl font-bold text-center mt-10">Welcome to Next.js + Auth0</h1>
        {user && (
            <div className="text-center mt-5">
                <h2 className="text-xl">Dashboard</h2>
                <p>Welcome, {user.name}</p>
            </div>
        )}
    </div>
    );
}

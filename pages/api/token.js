import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
    try {
        const session = await getSession(req, res);
        if (!session || !session.accessToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        res.json({ token: session.accessToken });
    } catch (error) {
        res.status(500).json({ error: "Failed to get access token" });
    }
}

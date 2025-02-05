import { loginUser } from '@/lib/services/userService';
import cors from "@/lib/middlewares/corsMiddleware";

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ error: error.message });
    }
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

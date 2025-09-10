import { NextResponse } from "next/server";
import { auth } from "@/firebase/admin";
import { setSessionCookie } from "@/lib/auth.action";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    // ✅ Verifikasi ID Token dulu
    const decoded = await auth.verifyIdToken(idToken, true);
    const { uid, email } = decoded;

    // ✅ Baru buat session cookie
    await setSessionCookie(idToken);

    return NextResponse.json({ success: true, uid, email });
  } catch (error: any) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Sign in failed" },
      { status: 401 }
    );
  }
}

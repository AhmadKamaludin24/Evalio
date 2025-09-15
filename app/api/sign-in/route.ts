import { NextResponse } from "next/server";
import { auth } from "@/firebase/admin";
import { setSessionCookie } from "@/lib/auth.action";

export async function POST(req: Request) {
  try {
    const { idToken, email } = await req.json();
    console.log(email)
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "User Does not exists. Create an account instead",
        },
        { status: 404 }
      );
    }

    const decoded = await auth.verifyIdToken(idToken, true);
    const { uid } = decoded;

 
    await setSessionCookie(idToken);

    return NextResponse.json({ success: true, uid, email });
  } catch (error: any) {
    console.log("Sign in error:", error.message);
    return NextResponse.json(
      { success: false, message: "Sign in failedss" },
      { status: 401 }
    );
  }
}

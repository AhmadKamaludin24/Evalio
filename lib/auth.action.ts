"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";


interface SignUpParams {
  uid: string;
  name: string;
  password: string;
  email: string;
}

interface SignInParams {
  idToken: string;
  email: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  console.log("Sign Up Params:", { uid, email, name });

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists, please sign in instead",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
        success: true,
        message: 'created user success'
    }
  } catch (e: any) {
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    console.error("Error during sign up:", e);

    return {
      success: false,
      message: "Internal server error",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: '/',
    sameSite: 'lax'

  });
}

// export async function signIn(params: SignInParams) {
//   const { idToken, email } = params;
//   console.log("Sign In Params:", { idToken, email });

//   try {
//     const userRecord = await auth.getUserByEmail(email);

//     if(!userRecord) {
//         return {
//             success: false,
//             message: 'User Does not exists. Create an account instead'
//         }
//     }

//     setSessionCookie(idToken)
//   } catch (e: any) {
//     console.log(e)
//     return {
//         success: false,
//         message: "failed to log in into an account"
//     }
//   }
// }


export async function getCurrentUser(): Promise<User | null> {

    const cookieStore = await cookies()

    const sessionCookie = cookieStore.get("session")?.value

    if(!sessionCookie) return null

    try {
         const decoded = await auth.verifySessionCookie(sessionCookie, true)

         const userRecord = await db.collection("users").doc(decoded.uid).get()

         if(!userRecord.exists) return null

         return {
            ... userRecord.data(),
            id: userRecord.id,

         } as User
     } catch (e: any) {
        console.log(e)
        return null
    }
    
}


export async function isAuthenticated() {
    const user = await getCurrentUser()

    return !!user
}


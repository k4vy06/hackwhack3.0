import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { passkey } = body;

        // Get passkey from environment variable (configurable at runtime)
        const validPasskey = process.env.ADMIN_PASSKEY || "REBLES2025HACKWHACK";

        if (passkey !== validPasskey) {
            return NextResponse.json(
                { error: "Invalid passkey" },
                { status: 401 }
            );
        }

        // Set session cookie for passkey verification
        const cookieStore = await cookies();
        cookieStore.set("admin_passkey_verified", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Passkey verification error:", error);
        return NextResponse.json(
            { error: "Verification failed" },
            { status: 500 }
        );
    }
}

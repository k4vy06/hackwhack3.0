import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const passkeyVerified = cookieStore.get("admin_passkey_verified");
        const authenticated = cookieStore.get("admin_authenticated");

        return NextResponse.json({
            passkeyValid: passkeyVerified?.value === "true",
            authenticated: !!authenticated?.value,
            email: authenticated?.value || null,
        });
    } catch (error) {
        console.error("Session check error:", error);
        return NextResponse.json(
            { passkeyValid: false, authenticated: false },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

interface AdminRow {
    id: number;
    email: string;
    password_hash: string;
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const passkeyVerified = cookieStore.get("admin_passkey_verified");

        if (!passkeyVerified || passkeyVerified.value !== "true") {
            return NextResponse.json(
                { error: "Passkey verification required" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if admin exists
        const admins = await query<AdminRow[]>(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );

        if (admins.length === 0) {
            // First-time setup - create admin account
            const passwordHash = await bcrypt.hash(password, 10);

            await query(
                "INSERT INTO admins (email, password_hash) VALUES (?, ?)",
                [email, passwordHash]
            );

            // Set authenticated cookie
            cookieStore.set("admin_authenticated", email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24 hours
            });

            return NextResponse.json({
                success: true,
                message: "Admin account created successfully",
            });
        }

        // Verify password
        const admin = admins[0];
        const validPassword = await bcrypt.compare(password, admin.password_hash);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Set authenticated cookie
        cookieStore.set("admin_authenticated", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return NextResponse.json({
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Login failed. Please try again." },
            { status: 500 }
        );
    }
}

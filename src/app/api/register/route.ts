import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

interface TeamRow {
    email: string;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { teamName, leaderName, email, phone, college, members } = body;

        // Validation
        if (!teamName || !leaderName || !email || !phone || !college) {
            return NextResponse.json(
                { error: "All required fields must be filled" },
                { status: 400 }
            );
        }

        // Check for duplicate email
        const existingTeams = await query<TeamRow[]>(
            "SELECT email FROM teams WHERE email = ?",
            [email]
        );

        if (existingTeams.length > 0) {
            return NextResponse.json(
                { error: "A team with this email is already registered" },
                { status: 409 }
            );
        }

        // Generate unique QR value
        const qrValue = `HACKWHACK-${uuidv4()}`;

        // Insert team into database
        await query(
            `INSERT INTO teams (team_name, leader_name, email, phone, college, members, qr_value) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                teamName,
                leaderName,
                email,
                phone,
                college,
                JSON.stringify(members || []),
                qrValue,
            ]
        );

        // Generate QR code as data URL
        const qrCode = await QRCode.toDataURL(qrValue, {
            width: 400,
            margin: 2,
            color: {
                dark: "#1a1a2e",
                light: "#ffffff",
            },
        });

        return NextResponse.json({
            success: true,
            message: "Team registered successfully",
            qrCode,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Failed to register team. Please try again." },
            { status: 500 }
        );
    }
}

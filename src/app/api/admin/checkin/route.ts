import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

interface TeamRow {
    team_id: number;
    team_name: string;
    checked_in: boolean;
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const authenticated = cookieStore.get("admin_authenticated");

        if (!authenticated?.value) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { qrValue } = body;

        if (!qrValue) {
            return NextResponse.json(
                { error: "QR code value is required" },
                { status: 400 }
            );
        }

        // Find team by QR value
        const teams = await query<TeamRow[]>(
            "SELECT team_id, team_name, checked_in FROM teams WHERE qr_value = ?",
            [qrValue]
        );

        if (teams.length === 0) {
            return NextResponse.json(
                { error: "Invalid QR code - Team not found" },
                { status: 404 }
            );
        }

        const team = teams[0];

        if (team.checked_in) {
            return NextResponse.json(
                { error: `Team "${team.team_name}" is already checked in` },
                { status: 409 }
            );
        }

        // Mark team as checked in
        await query(
            "UPDATE teams SET checked_in = TRUE WHERE team_id = ?",
            [team.team_id]
        );

        return NextResponse.json({
            success: true,
            message: `Team "${team.team_name}" checked in successfully!`,
        });
    } catch (error) {
        console.error("Check-in error:", error);
        return NextResponse.json(
            { error: "Check-in failed. Please try again." },
            { status: 500 }
        );
    }
}

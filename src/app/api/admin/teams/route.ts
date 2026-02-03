import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

interface TeamRow {
    team_id: number;
    team_name: string;
    leader_name: string;
    email: string;
    phone: string;
    college: string;
    members: string;
    qr_value: string;
    checked_in: boolean;
    created_at: string;
}

export async function GET() {
    try {
        const cookieStore = await cookies();
        const authenticated = cookieStore.get("admin_authenticated");

        if (!authenticated?.value) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }

        const teams = await query<TeamRow[]>(
            "SELECT * FROM teams ORDER BY created_at DESC"
        );

        // Parse members JSON for each team
        const parsedTeams = teams.map((team) => ({
            ...team,
            members: typeof team.members === 'string' ? JSON.parse(team.members) : team.members,
        }));

        return NextResponse.json({ teams: parsedTeams });
    } catch (error) {
        console.error("Fetch teams error:", error);
        return NextResponse.json(
            { error: "Failed to fetch teams" },
            { status: 500 }
        );
    }
}

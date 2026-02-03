"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
    Shield,
    Lock,
    Mail,
    Eye,
    EyeOff,
    Users,
    CheckCircle2,
    Search,
    LogOut,
    Camera,
    ArrowLeft,
    AlertCircle,
    X,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input3D } from "@/components/ui/3d-input";
import { GlassmorphismCard, HeroGlass } from "@/components/ui/glassmorphism-card";

interface Team {
    team_id: number;
    team_name: string;
    leader_name: string;
    email: string;
    phone: string;
    college: string;
    members: string[];
    checked_in: boolean;
    created_at: string;
}

type AuthStep = "passkey" | "login" | "dashboard";

export default function AdminPage() {
    const [authStep, setAuthStep] = useState<AuthStep>("passkey");
    const [passkey, setPasskey] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const [scanResult, setScanResult] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const scannerRef = useRef<HTMLDivElement>(null);
    const html5QrCodeRef = useRef<unknown>(null);

    // Check session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch("/api/admin/session");
                if (response.ok) {
                    const data = await response.json();
                    if (data.authenticated) {
                        setAuthStep("dashboard");
                        fetchTeams();
                    } else if (data.passkeyValid) {
                        setAuthStep("login");
                    }
                }
            } catch {
                // Session not found, start from passkey
            }
        };
        checkSession();
    }, []);

    const fetchTeams = async () => {
        try {
            const response = await fetch("/api/admin/teams");
            if (response.ok) {
                const data = await response.json();
                setTeams(data.teams);
            }
        } catch {
            console.error("Failed to fetch teams");
        }
    };

    const handlePasskeySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/verify-passkey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passkey }),
            });

            if (response.ok) {
                setAuthStep("login");
            } else {
                const data = await response.json();
                setError(data.error || "Invalid passkey");
            }
        } catch {
            setError("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setAuthStep("dashboard");
                fetchTeams();
            } else {
                setError(data.error || "Login failed");
            }
        } catch {
            setError("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            setAuthStep("passkey");
            setPasskey("");
            setEmail("");
            setPassword("");
            setTeams([]);
        } catch {
            console.error("Logout failed");
        }
    };

    const startScanner = async () => {
        setShowScanner(true);
        setScanResult(null);

        // Dynamic import for html5-qrcode (client-side only)
        const { Html5Qrcode } = await import("html5-qrcode");

        setTimeout(async () => {
            if (scannerRef.current) {
                const html5QrCode = new Html5Qrcode("qr-scanner");
                html5QrCodeRef.current = html5QrCode;

                try {
                    await html5QrCode.start(
                        { facingMode: "environment" },
                        { fps: 10, qrbox: { width: 250, height: 250 } },
                        async (decodedText) => {
                            // Stop scanner
                            await html5QrCode.stop();
                            setShowScanner(false);

                            // Check in team
                            try {
                                const response = await fetch("/api/admin/checkin", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ qrValue: decodedText }),
                                });

                                const data = await response.json();
                                setScanResult({
                                    success: response.ok,
                                    message: data.message || data.error,
                                });

                                if (response.ok) {
                                    fetchTeams();
                                }
                            } catch {
                                setScanResult({
                                    success: false,
                                    message: "Failed to process check-in",
                                });
                            }
                        },
                        () => {
                            // QR code scan error - ignore
                        }
                    );
                } catch {
                    setScanResult({
                        success: false,
                        message: "Failed to access camera",
                    });
                    setShowScanner(false);
                }
            }
        }, 100);
    };

    const stopScanner = async () => {
        if (html5QrCodeRef.current) {
            try {
                await (html5QrCodeRef.current as { stop: () => Promise<void> }).stop();
            } catch {
                // Ignore
            }
        }
        setShowScanner(false);
    };

    const filteredTeams = teams.filter(
        (team) =>
            team.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.leader_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalTeams = teams.length;
    const checkedInTeams = teams.filter((t) => t.checked_in).length;

    return (
        <div className="min-h-screen bg-grid">
            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
            </div>

            <AnimatePresence mode="wait">
                {/* Passkey Layer */}
                {authStep === "passkey" && (
                    <motion.div
                        key="passkey"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 flex min-h-screen items-center justify-center p-4"
                    >
                        <div className="w-full max-w-md">
                            <Link
                                href="/"
                                className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>

                            <HeroGlass>
                                <div className="mb-6 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                        <Shield className="h-8 w-8 text-primary" />
                                    </div>
                                    <h1 className="text-2xl font-bold">Admin Access</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Enter the passkey to continue
                                    </p>
                                </div>

                                <form onSubmit={handlePasskeySubmit} className="space-y-4">
                                    <Input3D
                                        type="password"
                                        placeholder="Enter passkey"
                                        value={passkey}
                                        onChange={(e) => setPasskey(e.target.value)}
                                        icon={<Lock className="h-4 w-4" />}
                                    />

                                    {error && (
                                        <p className="text-sm text-destructive flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading || !passkey}
                                    >
                                        {isLoading ? "Verifying..." : "Continue"}
                                    </Button>
                                </form>
                            </HeroGlass>
                        </div>
                    </motion.div>
                )}

                {/* Login Layer */}
                {authStep === "login" && (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 flex min-h-screen items-center justify-center p-4"
                    >
                        <div className="w-full max-w-md">
                            <button
                                onClick={() => setAuthStep("passkey")}
                                className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </button>

                            <HeroGlass>
                                <div className="mb-6 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h1 className="text-2xl font-bold">Admin Login</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Sign in or create your admin account
                                    </p>
                                </div>

                                <form onSubmit={handleLoginSubmit} className="space-y-4">
                                    <Input3D
                                        type="email"
                                        placeholder="Admin email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        icon={<Mail className="h-4 w-4" />}
                                    />

                                    <div className="relative">
                                        <Input3D
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            icon={<Lock className="h-4 w-4" />}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>

                                    {error && (
                                        <p className="text-sm text-destructive flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            {error}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading || !email || !password}
                                    >
                                        {isLoading ? "Signing in..." : "Sign In"}
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground">
                                        First time? Your account will be created automatically.
                                    </p>
                                </form>
                            </HeroGlass>
                        </div>
                    </motion.div>
                )}

                {/* Dashboard */}
                {authStep === "dashboard" && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 min-h-screen"
                    >
                        {/* Header */}
                        <header className="border-b border-white/10 bg-background/50 backdrop-blur-xl">
                            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-6 w-6 text-primary" />
                                    <span className="text-lg font-bold">REBLES Admin Access Control</span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={handleLogout}>
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </header>

                        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                            {/* Stats */}
                            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <GlassmorphismCard>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                            <Users className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Total Registered
                                            </p>
                                            <p className="text-2xl font-bold">{totalTeams}</p>
                                        </div>
                                    </div>
                                </GlassmorphismCard>

                                <GlassmorphismCard>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Checked In
                                            </p>
                                            <p className="text-2xl font-bold">{checkedInTeams}</p>
                                        </div>
                                    </div>
                                </GlassmorphismCard>

                                <GlassmorphismCard className="sm:col-span-2 lg:col-span-1">
                                    <Button
                                        className="w-full h-full min-h-[60px]"
                                        variant="glow"
                                        onClick={startScanner}
                                    >
                                        <Camera className="h-5 w-5" />
                                        Scan QR Code
                                    </Button>
                                </GlassmorphismCard>
                            </div>

                            {/* Scan Result */}
                            <AnimatePresence>
                                {scanResult && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`mb-6 rounded-xl p-4 ${scanResult.success
                                                ? "bg-green-500/10 border border-green-500/20"
                                                : "bg-destructive/10 border border-destructive/20"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {scanResult.success ? (
                                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <AlertCircle className="h-5 w-5 text-destructive" />
                                                )}
                                                <span
                                                    className={
                                                        scanResult.success
                                                            ? "text-green-500"
                                                            : "text-destructive"
                                                    }
                                                >
                                                    {scanResult.message}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => setScanResult(null)}
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search by team name, email, or leader..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input-3d w-full rounded-xl py-3 pl-10 pr-4"
                                    />
                                </div>
                            </div>

                            {/* Teams Table */}
                            <GlassmorphismCard className="overflow-hidden p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/10 text-left">
                                                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                                                    Team Name
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                                                    Leader
                                                </th>
                                                <th className="hidden px-4 py-3 text-sm font-medium text-muted-foreground md:table-cell">
                                                    Email
                                                </th>
                                                <th className="hidden px-4 py-3 text-sm font-medium text-muted-foreground lg:table-cell">
                                                    College
                                                </th>
                                                <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTeams.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan={5}
                                                        className="px-4 py-8 text-center text-muted-foreground"
                                                    >
                                                        No teams found
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredTeams.map((team) => (
                                                    <tr
                                                        key={team.team_id}
                                                        className="border-b border-white/5 transition-colors hover:bg-white/5"
                                                    >
                                                        <td className="px-4 py-3 font-medium">
                                                            {team.team_name}
                                                        </td>
                                                        <td className="px-4 py-3 text-muted-foreground">
                                                            {team.leader_name}
                                                        </td>
                                                        <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                                                            {team.email}
                                                        </td>
                                                        <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                                                            {team.college}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {team.checked_in ? (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                                                                    <CheckCircle2 className="h-3 w-3" />
                                                                    Checked In
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500">
                                                                    Pending
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </GlassmorphismCard>
                        </main>

                        {/* QR Scanner Modal */}
                        <AnimatePresence>
                            {showScanner && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0.9 }}
                                        className="w-full max-w-md rounded-2xl bg-card p-6"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">Scan QR Code</h3>
                                            <button
                                                onClick={stopScanner}
                                                className="rounded-full p-1 hover:bg-white/10"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <div
                                            ref={scannerRef}
                                            id="qr-scanner"
                                            className="aspect-square w-full overflow-hidden rounded-xl"
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

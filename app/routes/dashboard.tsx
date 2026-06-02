import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export const meta = () => ([
    { title: "Resumind | Dashboard" },
    { name: "description", content: "Your resume performance overview" },
]);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0d1421] border border-slate-700 rounded-xl px-4 py-2 font-mono text-sm">
                <p className="text-dark-200">Range: <span className="text-slate-100">{label}</span></p>
                <p className="text-dark-200">Resumes: <span className="text-[#00ffd1]">{payload[0].value}</span></p>
            </div>
        );
    }
    return null;
};

const ResumeHighlight = ({
    resume,
    label,
    accentClass,
    accentText,
}: {
    resume: Resume;
    label: string;
    accentClass: string;
    accentText: string;
}) => (
    <Link
        to={`/resume/${resume.id}`}
        className="flex flex-col gap-3 bg-[#0d1421] border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition-colors duration-200 w-full"
    >
        <div className={`text-xs font-mono font-semibold uppercase tracking-widest ${accentText}`}>
            {label}
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
                <p className="text-slate-100 font-semibold text-lg leading-tight">
                    {resume.companyName || "—"}
                </p>
                <p className="text-dark-200 font-mono text-sm">
                    {resume.jobTitle || "No title"}
                </p>
            </div>
            <div className={`flex items-center justify-center rounded-full px-4 py-2 ${accentClass} font-mono font-bold text-2xl min-w-[80px]`}>
                <span className={accentText}>{resume.feedback.overallScore}</span>
            </div>
        </div>
    </Link>
);

const StatChip = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex flex-col gap-1 bg-[#0d1421] border border-slate-800 rounded-2xl p-5 flex-1">
        <p className="text-dark-200 font-mono text-xs uppercase tracking-widest">{label}</p>
        <p className="text-slate-100 font-mono text-3xl font-bold">{value}</p>
    </div>
);

const Dashboard = () => {
    const { auth, isLoading, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate("/auth?next=/dashboard");
    }, [isLoading]);

    useEffect(() => {
    const load = async () => {
        const items = (await kv.list("resume:*", true)) as KVItem[];
        const parsed = items
            ?.filter((i) => i.value !== "")
            ?.map((i) => JSON.parse(i.value) as Resume) || [];
        setResumes(parsed);
        setLoading(false);
    };
    load();
}, []);

   const { scores, avgScore, best, worst } = useMemo(() => {
    if (!resumes.length) return { scores: [], avgScore: 0, best: null, worst: null };

    const valid = resumes.filter((r) => r.feedback?.overallScore !== undefined);
    if (!valid.length) return { scores: [], avgScore: 0, best: null, worst: null };

    const scores = valid.map((r) => Number(r.feedback.overallScore));
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    const best = valid.reduce((a, b) =>
        Number(a.feedback.overallScore) >= Number(b.feedback.overallScore) ? a : b
    );
    const worst = valid.reduce((a, b) =>
        Number(a.feedback.overallScore) <= Number(b.feedback.overallScore) ? a : b
    );

    return { scores, avgScore, best, worst };
}, [resumes]);


    
    const buckets = [
        { range: "0–20", min: 0, max: 20 },
        { range: "21–40", min: 21, max: 40 },
        { range: "41–60", min: 41, max: 60 },
        { range: "61–80", min: 61, max: 80 },
        { range: "81–100", min: 81, max: 100 },
    ];

    const chartData = buckets.map(({ range, min, max }) => ({
        range,
        count: scores.filter((s) => s >= min && s <= max).length,
    }));

    const barColor = (range: string) => {
        if (range === "81–100") return "#00ffd1";
        if (range === "61–80") return "#7b8fff";
        if (range === "41–60") return "#ffc96b";
        return "#ff6b6b";
    };

    if (loading) {
        return (
            <main className="bg-gradient min-h-screen">
                <Navbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <p className="text-dark-200 font-mono animate-pulse">Loading dashboard...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-gradient min-h-screen">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-8">
                    <h1>Your Dashboard</h1>
                    <h2>
                        {resumes.length === 0
                            ? "No resumes yet — upload one to see your stats."
                            : `Tracking ${resumes.length} resume${resumes.length > 1 ? "s" : ""}`}
                    </h2>
                </div>

                {resumes.length === 0 ? (
                    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                        Upload Resume
                    </Link>
                ) : (
                    <div className="flex flex-col gap-8 w-full max-w-4xl animate-in fade-in duration-700">

                        <div className="flex flex-row gap-4 flex-wrap">
                            <StatChip label="Total Resumes" value={resumes.length} />
                            <StatChip label="Average Score" value={`${avgScore}/100`} />
                            <StatChip label="Top Score" value={scores.length ? `${Math.max(...scores)}/100` : "—"} />
                        </div>

                        <div className="bg-[#0d1421] border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-slate-100 font-semibold text-lg">Score Distribution</p>
                                <p className="text-dark-200 font-mono text-sm">
                                    How your resumes are spread across score ranges
                                </p>
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={chartData} barSize={40}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis
                                        dataKey="range"
                                        tick={{ fill: "#94a3b8", fontFamily: "JetBrains Mono", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        allowDecimals={false}
                                        tick={{ fill: "#94a3b8", fontFamily: "JetBrains Mono", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={24}
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff08" }} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                        {chartData.map((entry) => (
                                            <Cell key={entry.range} fill={barColor(entry.range)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex flex-row gap-4 max-sm:flex-col">
                            {best && (
                                <ResumeHighlight
                                    resume={best}
                                    label="Best Resume"
                                    accentClass="bg-badge-green"
                                    accentText="text-badge-green-text"
                                />
                            )}
                            {worst && best?.id !== worst?.id && (
                                <ResumeHighlight
                                    resume={worst}
                                    label="Needs Most Work"
                                    accentClass="bg-badge-red"
                                    accentText="text-badge-red-text"
                                />
                            )}
                        </div>

                    </div>
                )}
            </section>
        </main>
    );
};

export default Dashboard;
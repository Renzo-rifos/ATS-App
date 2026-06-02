import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
    resume: { id, companyName, jobTitle, feedback, imagePath, resumePath },
    onDelete,
}: {
    resume: Resume;
    onDelete?: (id: string) => void;
}) => {
    const { fs, kv } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            setResumeUrl(url);
        };
        loadResume();
    }, [imagePath]);

const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDeleting(true);
    try {
        await fs.delete(imagePath);
        await fs.delete(resumePath);
    } catch (err) {
        console.error("fs.delete error:", err);
    }

    try {
        await kv.delete(`resume:${id}`);
    } catch (err) {
        console.error("kv.delete error:", err);
    }

    onDelete?.(id);
};

    return (
        <Link
            to={`/resume/${id}`}
            className="resume-card animate-in fade-in duration-1000 relative group"
        >
            <button
                onClick={handleDelete}
                disabled={deleting}
                className="
                    absolute top-3 right-3 z-10
                    p-2 rounded-lg
                    bg-badge-red border border-badge-red-text/30
                    hover:border-badge-red-text
                    text-badge-red-text
                    opacity-0 group-hover:opacity-100
                    transition-all duration-200
                    cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed
                "
            >
                {deleting ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30" strokeDashoffset="10" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                )}
            </button>

            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && (
                        <h2 className="text-slate-100 font-bold break-words">{companyName}</h2>
                    )}
                    {jobTitle && (
                        <h3 className="text-lg break-words text-dark-200 font-mono">{jobTitle}</h3>
                    )}
                    {!companyName && !jobTitle && (
                        <h2 className="text-slate-100 font-bold">Resume</h2>
                    )}
                </div>
                <div className="shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <img
                        src={resumeUrl}
                        alt="resume"
                        className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-xl"
                    />
                </div>
            )}
        </Link>
    );
};

export default ResumeCard;
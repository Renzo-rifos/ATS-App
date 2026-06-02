import React from "react";
import { cn } from "~/lib/utils";

interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    const iconSrc =
        score > 69
            ? "/icons/ats-good.svg"
            : score > 49
            ? "/icons/ats-warning.svg"
            : "/icons/ats-bad.svg";

    const subtitle =
        score > 69
            ? "Great Job!"
            : score > 49
            ? "Good Start"
            : "Needs Improvement";

    const cardClass =
        score > 69
            ? "bg-badge-green border-badge-green-text/30"
            : score > 49
            ? "bg-badge-yellow border-badge-yellow-text/30"
            : "bg-badge-red border-badge-red-text/30";

    const textAccent =
        score > 69
            ? "text-badge-green-text"
            : score > 49
            ? "text-badge-yellow-text"
            : "text-badge-red-text";

    return (
        <div className={cn("rounded-2xl border w-full p-6 flex flex-col gap-6", cardClass)}>

            <div className="flex items-center gap-4">
                <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
                <h2 className={cn("text-2xl font-bold font-mono", textAccent)}>
                    ATS Score — {score}/100
                </h2>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className={cn("text-xl font-semibold", textAccent)}>{subtitle}</h3>
                <p className="text-dark-200 font-mono text-sm">
                    This score represents how well your resume is likely to perform in
                    Applicant Tracking Systems used by employers.
                </p>

                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <img
                                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                                alt={suggestion.type === "good" ? "Check" : "Warning"}
                                className="w-5 h-5 mt-0.5 shrink-0"
                            />
                            <p
                                className={cn(
                                    "text-sm font-mono",
                                    suggestion.type === "good"
                                        ? "text-badge-green-text"
                                        : "text-badge-yellow-text"
                                )}
                            >
                                {suggestion.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <p className={cn("text-sm italic font-mono", textAccent + "/70")}>
                Keep refining your resume to improve your chances of getting past ATS
                filters and into the hands of recruiters.
            </p>
        </div>
    );
};

export default ATS;
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor =
        score > 70
            ? "text-badge-green-text"
            : score > 49
            ? "text-badge-yellow-text"
            : "text-badge-red-text";

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-2xl text-slate-100">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl text-slate-100">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-[#0d1421] border border-slate-800 rounded-2xl w-full">
            <div className="flex flex-row items-center p-4 gap-8 border-b border-slate-800">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    {/* h2 global aplica text-dark-200, override a slate-100 para el título principal */}
                    <h2 className="!text-2xl !text-slate-100 font-bold">Your Resume Score</h2>
                    <p className="text-sm text-dark-200 font-mono">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    );
};

export default Summary;
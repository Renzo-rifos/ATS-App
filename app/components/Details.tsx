import { cn } from "~/lib/utils";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
    return (
        <div
            className={cn(
                "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
                score > 69
                    ? "bg-badge-green"
                    : score > 39
                    ? "bg-badge-yellow"
                    : "bg-badge-red"
            )}
        >
            <img
                src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
                alt="score"
                className="size-4"
            />
            <p
                className={cn(
                    "text-sm font-medium font-mono",
                    score > 69
                        ? "text-badge-green-text"
                        : score > 39
                        ? "text-badge-yellow-text"
                        : "text-badge-red-text"
                )}
            >
                {score}/100
            </p>
        </div>
    );
};

const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number }) => {
    return (
        <div className="flex flex-row gap-4 items-center py-2">
            <p className="text-2xl font-semibold text-slate-100">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({
    tips,
}: {
    tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
    return (
        <div className="flex flex-col gap-4 items-center w-full">
            {/* Grid resumen de tips — antes bg-gray-50, ahora bg del tema */}
            <div className="bg-[#0d1421] border border-slate-800 w-full rounded-xl px-5 py-4 grid grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index}>
                        <img
                            src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                            alt="score"
                            className="size-5"
                        />
                        <p
                            className={cn(
                                "text-sm font-mono",
                                tip.type === "good"
                                    ? "text-badge-green-text"
                                    : "text-badge-yellow-text"
                            )}
                        >
                            {tip.tip}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 w-full">
                {tips.map((tip, index) => (
                    <div
                        key={index + tip.tip}
                        className={cn(
                            "flex flex-col gap-2 rounded-2xl p-4 border",
                            tip.type === "good"
                                ? "bg-badge-green border-badge-green-text/30"
                                : "bg-badge-yellow border-badge-yellow-text/30"
                        )}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                                alt="score"
                                className="size-5"
                            />
                            <p
                                className={cn(
                                    "text-xl font-semibold",
                                    tip.type === "good"
                                        ? "text-badge-green-text"
                                        : "text-badge-yellow-text"
                                )}
                            >
                                {tip.tip}
                            </p>
                        </div>
                        <p
                            className={cn(
                                "text-sm font-mono",
                                tip.type === "good"
                                    ? "text-badge-green-text/80"
                                    : "text-badge-yellow-text/80"
                            )}
                        >
                            {tip.explanation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Accordion>
                <AccordionItem id="tone-style">
                    <AccordionHeader itemId="tone-style">
                        <CategoryHeader title="Tone & Style" categoryScore={feedback.toneAndStyle.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style">
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader title="Content" categoryScore={feedback.content.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <CategoryContent tips={feedback.content.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <CategoryContent tips={feedback.structure.tips} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <CategoryContent tips={feedback.skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;
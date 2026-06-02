import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
                <p className="text-dark-200 font-mono">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
                <p className="text-badge-red-text font-mono">Error: {error}</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen flex justify-center items-start py-12">
            <div className="w-full max-w-4xl gradient-border">
                <div className="flex flex-col gap-6">

                    <div>
                        <h1 className="!text-3xl">Wipe App Data</h1>
                    </div>

                    <div>
                        <p className="text-dark-200 font-mono text-sm">
                            Authenticated as:{" "}
                            <span className="text-slate-100 font-semibold">
                                {auth.user?.username}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="!text-xl">Existing Files</h2>

                        {files.length === 0 ? (
                            <p className="text-dark-200 font-mono text-sm">
                                No files found.
                            </p>
                        ) : (
                            files.map((file) => (
                                <div
                                    key={file.id}
                                    className="uploader-selected-file"
                                >
                                    <p className="text-slate-300 font-mono text-sm break-all">
                                        {file.name}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    <button
                        className="
                            px-6 py-3
                            rounded-xl
                            font-mono
                            font-medium
                            text-badge-red-text
                            bg-badge-red
                            border border-badge-red-text/30
                            hover:border-badge-red-text
                            hover:bg-badge-red/80
                            cursor-pointer
                            transition-all duration-200
                            tracking-wide
                            w-fit
                        "
                        onClick={handleDelete}
                    >
                        Wipe App Data
                    </button>
                </div>
            </div>
        </main>
    );
};

export default WipeApp;
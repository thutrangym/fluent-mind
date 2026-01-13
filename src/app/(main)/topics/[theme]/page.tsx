import type { Metadata } from "next";

interface Props {
    params: { theme: string };
}

export function generateMetadata({ params }: Props): Metadata {
    const title = `${params.theme.charAt(0).toUpperCase() + params.theme.slice(1)} Topics - Fluent Mind`;
    return {
        title,
        description: `Explore engaging ${params.theme} topics to enhance your language skills with Fluent Mind.`,
    };
}

export default function ThemePage({ params }: Props) {
    const { theme } = params;
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                    {theme.charAt(0).toUpperCase() + theme.slice(1)} Topics
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    Explore a variety of engaging topics in the realm of {theme} to boost your language skills. Dive into articles, exercises, and interactive content tailored to your interests.
                </p>
                {/* Additional content related to the theme can be added here */}
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder for topic cards */}
                    {[1, 2, 3, 4, 5, 6].map((topic) => (
                        <div key={topic} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                {theme.charAt(0).toUpperCase() + theme.slice(1)} Topic {topic}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                A brief description of {theme} topic {topic}. Engage with content designed to enhance your understanding and fluency.
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
import { Link } from '@inertiajs/react';

const Banner = ({ message = '', url }) => {
    const safeUrl = url ?? '#';

    return (
        <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
            <div className="pointer-events-auto flex max-w-md items-center gap-2 rounded-md bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-600 px-4 py-2 text-sm text-white shadow-md">
                <p className="flex items-center gap-2">
                    <Link href={safeUrl} className="flex items-center gap-2 hover:underline">
                        <strong className="font-semibold">Pengumuman</strong>
                        <svg viewBox="0 0 2 2" className="h-2 w-2 fill-current">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        {message}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Banner;

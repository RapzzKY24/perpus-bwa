import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconAirBalloon } from '@tabler/icons-react';

const ApplicationLogo = ({ url = '/', size = 'h-9 w-9', isTitle = true }) => {
    return (
        <Link href={url} className="group flex items-center gap-2" aria-label="Books Heaven Logo" title="Books Heaven">
            <IconAirBalloon className={cn('text-indigo-800 transition-all group-hover:scale-105', size)} />
            {isTitle && (
                <div className="flex flex-col leading-tight">
                    <span className="text-base font-bold text-foreground">Books Heaven</span>
                    <span className="text-xs text-muted-foreground">Surganya Ilmu Pengetahuan</span>
                </div>
            )}
        </Link>
    );
};

export default ApplicationLogo;

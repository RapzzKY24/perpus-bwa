import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

const NavLink = ({
    active = false,
    url = "#",
    title,
    icon: Icon,
    ...props
}) => {
    return (
        <Link
            {...props}
            href={url}
            className={cn(
                active
                    ? "bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 font-semibold text-white  hover:text-white"
                    : "text-muted-foreground hover:text-indigo-500",
                "flex items-center gap-3 rounded-lg font-medium transition-all p-3"
            )}
        >
            <Icon className="h-4 w-4" />
            {title}
        </Link>
    );
};

export default NavLink;

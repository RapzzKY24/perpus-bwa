import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";

export default function GuestLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            {children}
        </>
    );
}

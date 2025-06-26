import ApplicationLogo from '@/Components/ApplicationLogo';
import Banner from '@/Components/Banner';
import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Toaster } from '@/Components/ui/sonner';
import { Head, Link, usePage } from '@inertiajs/react';
import { AvatarImage } from '@radix-ui/react-avatar';
import Sidebar from './Partials/Sidebar';
import ThemeSwircher from '@/Components/ThemeSwircher';

export default function AppLayout({ title, children }) {
    const auth = usePage().props.auth.user;
    console.log(auth);
    const { url } = usePage();
    const announcement = usePage().props.announcement;

    return (
        <>
            <Head title={title} />
            <Toaster position="top-center" richColors />
            <div className="flex min-h-screen w-full flex-row">
                <div className="hidden w-1/5 border-r lg:block">
                    <div className="flex h-full min-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <ApplicationLogo />
                            <ThemeSwircher/>
                        </div>
                        <div className="flex-1">
                            <Sidebar url={url} auth={auth} />
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col lg:w-4/5">
                    <header className="flex h-12 items-center justify-between gap-4 border-b px-4 lg:h-[60px] lg:justify-end lg:px-6">
                        {/* sidebar responsive */}
                        {/* dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex gap-x-2">
                                    <span>Hi,{auth.name}!</span>
                                    <Avatar>
                                        <AvatarImage src={auth.avatar}></AvatarImage>
                                        <AvatarFallback>{auth.name.substring(0, 1)}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                                <DropdownMenuSeparator></DropdownMenuSeparator>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('logout')} method="post">
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="w-full">
                        <div className="relative">
                            <div className="gap-4 p-4 lg:gap-6">
                                {children}
                                {announcement && announcement.is_active == 1 && (
                                    <Banner message={announcement.message} url={announcement.url} />
                                )}
                            </div>
                            <div
                                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                                aria-hidden="true"
                            >
                                <div
                                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-300 to-indigo-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                    style={{
                                        clipPath: 'polygon(...)',
                                    }}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

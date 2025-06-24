import CardStats from '@/Components/CardStats';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';

import { Link } from '@inertiajs/react';
import {
    IconArrowUpRight,
    IconBook,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconMoneybag,
    IconUser,
} from '@tabler/icons-react';

export default function Dashboard(props) {
    const auth = props.auth.user;
    return (
        <div className="flex w-full flex-col space-x-4 pb-32">
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconDashboard}
                />
            </div>
            {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <CardStats
                        data={{
                            title: 'Total Buku',
                            icon: IconBook,
                            background: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500',
                            iconClasname: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_books}</div>
                    </CardStats>
                    <CardStats
                        data={{
                            title: 'Total Pengguna',
                            icon: IconUser,
                            background: 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-500',
                            iconClasname: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_users}</div>
                    </CardStats>
                    <CardStats
                        data={{
                            title: 'Peminjaman',
                            icon: IconCreditCardPay,
                            background: 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500',
                            iconClasname: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
                    </CardStats>
                    <CardStats
                        data={{
                            title: 'Pengembalian',
                            icon: IconCreditCardRefund,
                            background: 'text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-500',
                            iconClasname: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
                    </CardStats>
                </div>
            )}

            {auth.role.some((role) => ['member'].includes(role)) && (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <CardStats
                        data={{
                            title: 'Total Peminjaman',
                            icon: IconCreditCardPay,
                            background: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500',
                            iconClasname: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
                    </CardStats>
                    <CardStats
                        data={{
                            title: 'Total Pengembalian',
                            icon: IconCreditCardRefund,
                            background: 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-500',
                            iconClasname: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
                    </CardStats>
                    <CardStats
                        data={{
                            title: 'Denda',
                            icon: IconMoneybag,
                            background: 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500',
                            iconClasname: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_fines}</div>
                    </CardStats>
                </div>
            )}
            <div className="mt-3 flex w-full flex-col justify-between gap-2 lg:flex-row">
                <Card className="w-full lg:w-1/2">
                    {/* transaksi peminjaman */}
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                            <div className="flex flex-col gap-y-2">
                                <CardTitle>Tranksaksi Peminjaman</CardTitle>
                                <CardDescription>Anda dapat melihat 5 transaksi peminjaman</CardDescription>
                            </div>
                            <Button variant="blue" asChild>
                                {auth.role.some((role) => ['admin', 'operator'].includes(role)) ? (
                                    <Link href={route('admin.loans.index')}>
                                        lihat semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                ) : (
                                    <Link href="#">
                                        lihat semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Kode Peminjaman</TableHead>
                                    <TableHead>Buku</TableHead>
                                    <TableHead>Member</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.loans.map((loan, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{loan.loan_code}</TableCell>
                                        <TableCell>{loan.book.title}</TableCell>
                                        <TableCell>{loan.user.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="w-full lg:w-1/2">
                    {/* pengembalian */}
                    <CardHeader>
                        <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                            <div className="flex flex-col gap-y-2">
                                <CardTitle>Tranksaksi Pengembalian</CardTitle>
                                <CardDescription>Anda dapat melihat 5 transaksi pengembalian</CardDescription>
                            </div>
                            <Button variant="blue" asChild>
                                {auth.role.some((role) => ['admin', 'operator'].includes(role)) ? (
                                    <Link href={route('admin.return-books.index')}>
                                        lihat semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                ) : (
                                    <Link href="#">
                                        lihat semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Kode Pengembalian</TableHead>
                                    <TableHead>Buku</TableHead>
                                    <TableHead>Member</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.return_books.map((returnBook, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{returnBook.return_book_code}</TableCell>
                                        <TableCell>{returnBook.book.title}</TableCell>
                                        <TableCell>{returnBook.user.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout title="Dashboard" children={page}></AppLayout>;

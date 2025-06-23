import CardStats from '@/Components/CardStats';
import CardStatsDescription from '@/Components/CardStatsDescription';
import GetFineStatusBadge from '@/Components/GetFineStatusBadge';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconCalendar, IconCalendarMonth, IconCalendarWeek, IconEye, IconMoneybag } from '@tabler/icons-react';

const Index = (props) => {
    const { data: fines, meta } = props.page_data.fines;
    return (
        <div className="flex w-full flex-col space-y-4 pb-32">
            <div className="flex flex-col items-start justify-between gap-x-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconMoneybag}
                />
            </div>
            <h2 className="font-semibold leading-relaxed text-foreground">Total Denda</h2>
            <div className="lg: grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <CardStats
                    data={{
                        title: 'Harian',
                        icon: IconCalendar,
                        background: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_fines.days}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Mingguan',
                        icon: IconCalendarWeek,
                        background: 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_fines.weeks}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Bulanan',
                        icon: IconCalendarMonth,
                        background: 'text-white bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_fines.months}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Tahunan',
                        icon: IconCalendar,
                        background: 'text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_fines.years}</div>
                </CardStats>
            </div>

            <h2 className="font-semibold leading-relaxed text-foreground">Rincian Denda</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Tabel Denda</CardTitle>
                    <CardDescription>Menampilkan rincian denda semua member</CardDescription>
                </CardHeader>
                <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Kode Peminjaman</TableHead>
                                <TableHead>Kode Pengembalian</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Tanggal Peminjaman</TableHead>
                                <TableHead>Batas Pengembalian</TableHead>
                                <TableHead>Tanggal Pengembalian</TableHead>
                                <TableHead>Denda Keterlambatan</TableHead>
                                <TableHead>Denda Lainnya</TableHead>
                                <TableHead>Total Denda</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fines.map((fine, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{fine.loan?.loan_code}</TableCell>
                                    <TableCell>{fine.return_book?.return_book_code}</TableCell>
                                    <TableCell>{fine.user?.name}</TableCell>

                                    <TableCell>{fine.loan?.loan_date}</TableCell>
                                    <TableCell>{fine.loan?.due_date}</TableCell>
                                    <TableCell>{fine.return_book?.return_date}</TableCell>
                                    <TableCell>{formatToRupiah(fine.late_fee)}</TableCell>
                                    <TableCell>{formatToRupiah(fine.other_fee)}</TableCell>
                                    <TableCell>{formatToRupiah(fine.total_fee)}</TableCell>
                                    <TableCell>
                                        <GetFineStatusBadge status={fine.payment_status} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="green" size="sm" asChild>
                                                <Link
                                                    href={route('admin.fines.create', [
                                                        fine.return_book?.return_book_code,
                                                    ])}
                                                >
                                                    <IconEye className="size-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                    <p className="font-sm mb-2 text-muted-foreground">
                        Menampilkan <span className="font-medium text-indigo-500">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} denda
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && (
                            <Pagination>
                                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                    {meta.links.map((link, index) => (
                                        <PaginationItem key={index} className="mx-1 mb-1 lg:mb-0">
                                            <PaginationLink href={link.url} isActive={link.active}>
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                </CardFooter>
            </Card>
            <h2 className="font-semibold leading-relaxed text-foreground">Denda Berdasarkan Member</h2>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Member Memilik Denda Terbanyak</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Total Denda</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.most_fine_member.map((mostFineMember, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{mostFineMember.user?.name}</TableCell>
                                        <TableCell>{formatToRupiah(mostFineMember.total_fee)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {/* terdikit */}
                <div className="lg:grid-cols- grid gap-4 md:gap-8">
                    <CardStatsDescription title="Sudah Dibayar" description="Denda Sudah Berhasil Dibayar">
                        <div className="flex items-baseline gap-4 text-3xl font-bold tabular-nums leading-none text-indigo-600">
                            {formatToRupiah(props.page_data.fine_paid)}
                        </div>
                    </CardStatsDescription>
                    <CardStatsDescription title="Belum Dibayar" description="Denda Belum Dibayar">
                        <div className="flex items-baseline gap-4 text-3xl font-bold tabular-nums leading-none text-indigo-600">
                            {formatToRupiah(props.page_data.fine_pending)}
                        </div>
                    </CardStatsDescription>
                </div>
            </div>
            {/* terdikit */}
        </div>
    );
};
Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Index;

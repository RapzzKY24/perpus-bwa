import CardStats from '@/Components/CardStats';
import HeaderTitle from '@/Components/HeaderTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { IconCalendar, IconCalendarMonth, IconCalendarWeek, IconChartDots2 } from '@tabler/icons-react';

const Index = (props) => {
    return (
        <div className="flex w-full flex-col space-y-4 pb-32">
            <div className="flex flex-col items-start justify-between gap-x-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconChartDots2}
                />
            </div>
            <h2 className="font-semibold leading-relaxed text-foreground">Total Peminjaman</h2>
            <div className="lg: grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <CardStats
                    data={{
                        title: 'Harian',
                        icon: IconCalendar,
                        background: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_loans.days}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Mingguan',
                        icon: IconCalendarWeek,
                        background: 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_loans.weeks}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Bulanan',
                        icon: IconCalendarMonth,
                        background: 'text-white bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_loans.months}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Tahunan',
                        icon: IconCalendar,
                        background: 'text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-500',
                        iconClassName: 'text-white',
                    }}
                >
                    <div classname="text-2xl font-bold">{props.page_data.total_loans.years}</div>
                </CardStats>
            </div>

            <h2 className="font-semibold leading-relaxed text-foreground">Peminjaman Per Buku</h2>
            <div className="flex w-full flex-col justify-between gap-8 lg:flex-row">
                <Card className="w-full lg:w-1/2">
                    <CardHeader>
                        <CardTitle>Buku Paling Banyak Dipinjam</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Buku</TableHead>
                                    <TableHead>Penulis</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.most_loans_books.map((mostLoanBook, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{mostLoanBook.title}</TableCell>
                                        <TableCell>{mostLoanBook.author}</TableCell>
                                        <TableCell className="text-center">{mostLoanBook.loans_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="w-full lg:w-1/2">
                    <CardHeader>
                        <CardTitle>Buku Paling Sedikit Dipinjam</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Buku</TableHead>
                                    <TableHead>Penulis</TableHead>
                                    <TableHead>Jumlah</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.page_data.least_loans_books.map((leastLoanBook, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{leastLoanBook.title}</TableCell>
                                        <TableCell>{leastLoanBook.author}</TableCell>
                                        <TableCell>{leastLoanBook.loans_count}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Index;

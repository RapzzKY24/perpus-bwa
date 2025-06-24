import CardStats from '@/Components/CardStats';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { SelectValue } from '@radix-ui/react-select';
import {
    IconArrowsDownUp,
    IconChecklist,
    IconCreditCardRefund,
    IconEye,
    IconMoneybag,
    IconRefresh,
} from '@tabler/icons-react';
import { useState } from 'react';

const Index = (props) => {
    const { data: return_books, meta } = props.return_books;
    const [params, setParams] = useState(props.state);
    const onSortTable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };
    useFilter({
        route: route('front.return-books.index'),
        values: params,
        only: ['return_books'],
    });
    return (
        <div className="flex w-full flex-col space-y-4 pb-32">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconCreditCardRefund}
                />
            </div>

            {/* statistik */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <CardStats
                    data={{
                        title: 'Dikembalikan',
                        icon: IconCreditCardRefund,
                        background: 'text-white bg-gradient-to-r from-green-500 via-green-600 to-green-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.returned}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Pengecekan',
                        icon: IconChecklist,
                        background: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.checked}</div>
                </CardStats>
                <CardStats
                    data={{
                        title: 'Denda',
                        icon: IconMoneybag,
                        background: 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-600',
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{props.page_data.fine}</div>
                </CardStats>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="search..."
                            value={params?.search}
                            onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                        />
                        <Select value={params?.load} onValueChange={(e) => setParams({ ...params, load: e })}>
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Load" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 25, 30].map((number, index) => (
                                    <SelectItem key={index} value={number}>
                                        {number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="red" onClick={() => setParams(props.state)} size="xl">
                            <IconRefresh className="size-4" />
                            Bersihkan
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('id')}
                                    >
                                        #
                                        <span className="ml-2 flex-none text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('return_book_code')}
                                    >
                                        Kode Pengembalian
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('loan_code')}
                                    >
                                        Kode Peminjaman
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('book_id')}
                                    >
                                        Buku
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('status')}
                                    >
                                        Status
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('loan_date')}
                                    >
                                        Tanggal Peminjaman
                                        <span className="ml-2 flex-none rounded text-muted-foreground" />
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('due_date')}
                                    >
                                        Batas Pengembalian
                                        <span className="ml-2 flex-none rounded text-muted-foreground" />
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex"
                                        onClick={() => onSortTable('return_date')}
                                    >
                                        Tanggal Pengembalian
                                        <span className="ml-2 flex-none rounded text-muted-foreground" />
                                    </Button>
                                </TableHead>
                                <TableHead>Denda</TableHead>
                                <TableHead>Kondisi</TableHead>
                                <TableHead>Dibuat Pada</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-center">
                            {return_books.map((return_book, indeks) => (
                                <TableRow key={indeks}>
                                    <TableCell>{indeks + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{return_book.return_book_code}</TableCell>
                                    <TableCell>{return_book.loan.loan_code}</TableCell>
                                    <TableCell>{return_book.book.title}</TableCell>
                                    <TableCell>{return_book.status}</TableCell>
                                    <TableCell>{return_book.loan.loan_date}</TableCell>
                                    <TableCell>{return_book.loan.due_date}</TableCell>
                                    <TableCell>{return_book.return_date}</TableCell>
                                    <TableCell className="text-red-500">{formatToRupiah(return_book.fine)}</TableCell>
                                    <TableCell>{return_book.return_book_check ?? '-'}</TableCell>
                                    <TableCell>{return_book.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="orange" sizi="sm" asChild>
                                                <Link
                                                    href={route('front.return-books.show', [
                                                        return_book.return_book_code,
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
                        menampilkan <span className="font-medium text-indigo-500">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} Pengembalian
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
        </div>
    );
};

Index.layout = (page) => <AppLayout title={page.props.page_setting.title} children={page}></AppLayout>;

export default Index;

import HeaderTitle from '@/Components/HeaderTitle';
import SortableHeader from '@/Components/SortTableHeader';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage, formatToRupiah } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconBooks, IconPencil, IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Index = (props) => {
    const { data: books, meta } = props.books;
    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.books.index'),
        values: params,
        only: ['books'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title={props.page_setting.title} subtitle={props.page_setting.subtitle} icon={IconBooks} />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.books.create')}>
                        <IconPlus size="4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="Cari buku..."
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
                            <IconRefresh className="size-4" /> Bersihkan
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Judul"
                                        field="title"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Kode Buku"
                                        field="book_code"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Penulis"
                                        field="author"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="ISBN"
                                        field="isbn"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Bahasa"
                                        field="language"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>Tahun</TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Harga"
                                        field="price"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Jumlah Halaman"
                                        field="number_of_page"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Kategori"
                                        field="category_id"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Penerbit"
                                        field="publisher_id"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Dibuat Pada"
                                        field="created_at"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books.map((book, index) => (
                                <TableRow key={index} className="w-[140px] whitespace-nowrap text-center text-sm">
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.book_code}</TableCell>

                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell>{book.language}</TableCell>
                                    <TableCell>{book.publication_year}</TableCell>
                                    <TableCell>{formatToRupiah(book.price)}</TableCell>
                                    <TableCell>{book.number_of_pages}</TableCell>
                                    <TableCell>{book.stock?.total ?? 0}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                book.stock?.total > 0
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {book.stock?.total > 0 ? 'Tersedia' : 'Kosong'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{book.category?.name}</TableCell>
                                    <TableCell>{book.publisher?.name}</TableCell>
                                    <TableCell>{book.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-2">
                                            <Button variant="green" size="sm" asChild>
                                                <Link
                                                    href={route('admin.books.edit', [book.id])}
                                                    className="flex items-center gap-1"
                                                >
                                                    <IconPencil size="4" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="red" size="sm">
                                                        <IconTrash size="4" />
                                                        Hapus
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Data akan dihapus secara permanen.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(route('admin.books.destroy', [book.id]), {
                                                                    preserveScroll: true,
                                                                    preserveState: true,
                                                                    onSuccess: (success) => {
                                                                        const flash = flashMessage(success);
                                                                        if (flash) toast[flash.type](flash.message);
                                                                    },
                                                                })
                                                            }
                                                        >
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
                        {meta.total} buku
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

Index.layout = (page) => <AppLayout title={page.props.page_setting.title}>{page}</AppLayout>;

export default Index;

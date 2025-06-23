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
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconBuildingCommunity, IconPencil, IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Index = (props) => {
    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.publishers.index'),
        values: params,
        only: ['publishers'],
    });

    const { data: publishers, meta } = props.publishers;

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.publishers.create')}>
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
                            placeholder="cari penulis..."
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
                                <TableHead className="whitespace-nowrap text-left">#</TableHead>
                                <TableHead className="whitespace-nowrap text-left">
                                    <SortableHeader
                                        label="Nama"
                                        field="name"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead className="whitespace-nowrap text-left">
                                    <SortableHeader
                                        label="Slug"
                                        field="slug"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead className="whitespace-nowrap text-left">
                                    <SortableHeader
                                        label="Alamat"
                                        field="address"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead className="whitespace-nowrap text-left">
                                    <SortableHeader
                                        label="Email"
                                        field="email"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead className="whitespace-nowrap text-left">
                                    <SortableHeader
                                        label="Nomor Handphone"
                                        field="phone"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead className="whitespace-nowrap text-left">Dibuat Pada</TableHead>
                                <TableHead className="w-[120px] text-center">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {publishers.map((publisher, index) => (
                                <TableRow key={index} className="transition hover:bg-muted">
                                    <TableCell className="whitespace-nowrap text-left">
                                        {index + 1 + (meta.current_page - 1) * meta.per_page}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap text-left">{publisher.name}</TableCell>
                                    <TableCell className="whitespace-nowrap text-left">{publisher.slug}</TableCell>
                                    <TableCell className="whitespace-nowrap text-left">{publisher.address}</TableCell>
                                    <TableCell className="whitespace-nowrap text-left text-muted-foreground">
                                        {publisher.email}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap text-left text-muted-foreground">
                                        {publisher.phone}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap text-left">
                                        {publisher.created_at}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap text-center">
                                        <div className="flex justify-center gap-x-2">
                                            <Button variant="green" size="sm" asChild>
                                                <Link
                                                    href={route('admin.publishers.edit', [publisher.id])}
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
                                                        <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Aksi ini tidak dapat dibatalkan. Data akan dihapus permanen
                                                            dari server.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(
                                                                    route('admin.publishers.destroy', [publisher.id]),
                                                                    {
                                                                        preserveScroll: true,
                                                                        preserveState: true,
                                                                        onSuccess: (success) => {
                                                                            const flash = flashMessage(success);
                                                                            if (flash) toast[flash.type](flash.message);
                                                                        },
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            Lanjutkan
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
                        menampilkan{''} <span className="font-medium text-indigo-500">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} kategori
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

Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;

export default Index;

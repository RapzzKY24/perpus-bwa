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
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
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
import { IconPencil, IconPlus, IconRefresh, IconTrash, IconUsersGroup } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Index = (props) => {
    const { data: users, meta } = props.users;
    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('admin.users.index'),
        values: params,
        only: ['users'],
    });

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconUsersGroup}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.users.create')}>
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
                            placeholder="Cari Pengguna..."
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
                <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <SortableHeader
                                        label="#"
                                        field="id"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Nama"
                                        field="name"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Username"
                                        field="username"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <SortableHeader
                                    label="Email"
                                    field="email"
                                    currentField={params.field}
                                    direction={params.direction}
                                    onSort={onSortTable}
                                />
                                <TableHead>
                                    <SortableHeader
                                        label="Tanggal Lahir"
                                        field="date_of_birth"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Jenis Kelamain"
                                        field="gender"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Nomor Handphone"
                                        field="phone"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>
                                    <SortableHeader
                                        label="Alamat"
                                        field="address"
                                        currentField={params.field}
                                        direction={params.direction}
                                        onSort={onSortTable}
                                    />
                                </TableHead>
                                <TableHead>Cover</TableHead>
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
                            {users.map((user, index) => (
                                <TableRow key={index} className="w-[140px] whitespace-nowrap text-center text-sm">
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.date_of_birth}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={user.cover} alt={user.name} />
                                            <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{user.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-2">
                                            <Button variant="green" size="sm" asChild>
                                                <Link
                                                    href={route('admin.users.edit', [user.id])}
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
                                                                router.delete(route('admin.users.destroy', [user.id]), {
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
                        {meta.total} Pengguna
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

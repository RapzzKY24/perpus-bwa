import HeaderTitle from "@/Components/HeaderTitle";
import SortableHeader from "@/Components/SortTableHeader";
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
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useFilter } from "@/Hooks/useFilter";
import AppLayout from "@/Layouts/AppLayout";
import { flashMessage } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import {
    IconArrowsDownUp,
    IconBuildingCommunity,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
} from "@tabler/icons-react";
import React, { useState } from "react";

const Index = (props) => {
    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field,
            direction: params.direction === "asc" ? "desc" : "asc",
        });
    };

    useFilter({
        route: route("admin.publishers.index"),
        values: params,
        only: ["publishers"],
    });

    const { data: publishers, meta } = props.publishers;

    return (
        <div className="flex flex-col pb-32 w-full">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route("admin.publishers.create")}>
                        <IconPlus size="4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col w-full gap-4 lg:items-center lg:flex-row">
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
                        <Select
                            value={params?.load}
                            onValueChange={(e) =>
                                setParams({ ...params, load: e })
                            }
                        >
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
                        <Button
                            variant="red"
                            onClick={() => setParams(props.state)}
                            size="xl"
                        >
                            <IconRefresh className="size-4" />
                            Bersihkan
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap text-left">
                                    #
                                </TableHead>
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
                                <TableHead className="whitespace-nowrap text-left">
                                    Dibuat Pada
                                </TableHead>
                                <TableHead className="w-[120px] text-center">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {publishers.map((publisher, index) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-muted transition"
                                >
                                    <TableCell className="text-left whitespace-nowrap">
                                        {index +
                                            1 +
                                            (meta.current_page - 1) *
                                                meta.per_page}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-nowrap">
                                        {publisher.name}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-nowrap">
                                        {publisher.slug}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-nowrap">
                                        {publisher.address}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-nowrap text-muted-foreground">
                                        {publisher.email}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-nowrap text-muted-foreground">
                                        {publisher.phone}
                                    </TableCell>
                                    <TableCell className="text-left whitespace-nowrap">
                                        {publisher.created_at}
                                    </TableCell>
                                    <TableCell className="text-center whitespace-nowrap">
                                        <div className="flex justify-center gap-x-2">
                                            <Button
                                                variant="green"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.publishers.edit",
                                                        [publisher.id]
                                                    )}
                                                    className="flex items-center gap-1"
                                                >
                                                    <IconPencil size="4" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="red"
                                                        size="sm"
                                                    >
                                                        <IconTrash size="4" />
                                                        Hapus
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah Anda yakin?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Aksi ini tidak dapat
                                                            dibatalkan. Data
                                                            akan dihapus
                                                            permanen dari
                                                            server.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Batal
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(
                                                                    route(
                                                                        "admin.publishers.destroy",
                                                                        [
                                                                            publisher.id,
                                                                        ]
                                                                    ),
                                                                    {
                                                                        preserveScroll: true,
                                                                        preserveState: true,
                                                                        onSuccess:
                                                                            (
                                                                                success
                                                                            ) => {
                                                                                const flash =
                                                                                    flashMessage(
                                                                                        success
                                                                                    );
                                                                                if (
                                                                                    flash
                                                                                )
                                                                                    toast[
                                                                                        flash
                                                                                            .type
                                                                                    ](
                                                                                        flash.message
                                                                                    );
                                                                            },
                                                                    }
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

                <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                    <p className="mb-2 font-sm text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-medium text-indigo-500">
                            {meta.from ?? 0}
                        </span>{" "}
                        dari {meta.total} Penulis
                    </p>
                    {meta.has_pages && (
                        <div className="overflow-x-auto">
                            <Pagination>
                                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                    {meta.links.map((link, index) => (
                                        <PaginationItem
                                            key={index}
                                            className="mx-1 mb-1 lg:mb-0"
                                        >
                                            <PaginationLink
                                                href={link.url}
                                                isActive={link.active}
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};

Index.layout = (page) => (
    <AppLayout children={page} title={page.props.page_setting.title} />
);

export default Index;

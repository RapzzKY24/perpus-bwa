import HeaderTitle from "@/Components/HeaderTitle";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
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
import { SelectValue } from "@radix-ui/react-select";
import {
    IconCategory,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

const Index = (props) => {
    const { data: categories, meta } = props.categories;
    const [params, setParams] = useState(props.state);
    useFilter({
        route: route("admin.categories.index"),
        values: params,
        only: ["categories"],
    });
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconCategory}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route("admin.categories.create")}>
                        <IconPlus size="4" />
                        Tambah
                    </Link>
                </Button>
                {console.log("categories:", props.categories)}
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col w-full gap-4 lg:items-center lg:flex-row">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="cari kategori..."
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
                                {[5, 10, 20, 25, 30].map((number, index) => (
                                    <SelectItem key={index} value={number}>
                                        {number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Cover</TableHead>
                                <TableHead>Dibuat Pada</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category, indeks) => (
                                <TableRow key={indeks}>
                                    <TableCell>
                                        {indeks +
                                            1 +
                                            (meta.current_page - 1) *
                                                meta.per_page}
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.slug}</TableCell>
                                    <TableCell>
                                        {category.description
                                            ? category.description
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage
                                                src={category.cover}
                                                alt={category.nama}
                                            />
                                            <AvatarFallback>
                                                {category.name.substring(0, 1)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{category.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-2">
                                            <Button
                                                variant="green"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.categories.edit",
                                                        [category.id]
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
                                                            Apakah Anda Bener
                                                            Yakin
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan tidak dapat
                                                            dibatalkan,tindakan
                                                            ini akan menghapus
                                                            data permanen dan
                                                            mengapus data dari
                                                            server kami
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(
                                                                    route(
                                                                        "admin.categories.destroy",
                                                                        [
                                                                            category,
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
                                                            Continue
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
                        menampilkan{""}{" "}
                        <span className="font-medium text-indigo-500 ">
                            {meta.from ?? 0}
                        </span>{" "}
                        dari {meta.total} kategori
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && (
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
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

Index.layout = (page) => (
    <AppLayout
        title={page.props.page_setting.title}
        children={page}
    ></AppLayout>
);

export default Index;

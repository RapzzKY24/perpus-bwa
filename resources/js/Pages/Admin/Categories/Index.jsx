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
import { Card, CardContent } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AppLayout from "@/Layouts/AppLayout";
import { flashMessage } from "@/lib/utils";
import { Link, router } from "@inertiajs/react";
import {
    IconCategory,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";

const Index = (props) => {
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
            </div>
            <Card>
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
                            {props.categories.map((category, indeks) => (
                                <TableRow key={indeks}>
                                    <TableCell>{indeks + 1}</TableCell>
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

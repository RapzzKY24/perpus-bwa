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

const Index = ({ categories, page_setting }) => {
    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="flex items-start gap-x-3">
                    <IconCategory className="w-6 h-6 mt-1 text-black" />
                    <div>
                        <h1 className="text-xl font-semibold text-black">
                            {page_setting.title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {page_setting.subtitle}
                        </p>
                    </div>
                </div>
                <Button variant="blue" size="lg" asChild>
                    <Link
                        href={route("admin.categories.create")}
                        className="flex items-center gap-2"
                    >
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">
                                    No
                                </TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Cover</TableHead>
                                <TableHead>Dibuat</TableHead>
                                <TableHead className="text-center">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories?.map((category, index) => (
                                <TableRow key={category.id}>
                                    <TableCell className="text-center font-medium">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {category.slug}
                                    </TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage
                                                src={category.cover}
                                                alt={category.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                            <AvatarFallback>
                                                {category.name.substring(0, 1)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {category.created_at}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center gap-x-2">
                                            <Button
                                                variant="blue"
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
                                                    <IconPencil className="size-4" />
                                                    Edit
                                                </Link>
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                    >
                                                        <IconTrash className="size-4" />
                                                        Hapus
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Yakin ingin
                                                            menghapus?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Data ini akan
                                                            dihapus secara
                                                            permanen dari server
                                                            dan tidak dapat
                                                            dikembalikan.
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
            </Card>
        </div>
    );
};

Index.layout = (page) => (
    <AppLayout title={page.props.page_setting.title}>{page}</AppLayout>
);

export default Index;

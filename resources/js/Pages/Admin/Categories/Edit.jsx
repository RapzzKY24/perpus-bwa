import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AppLayout from "@/Layouts/AppLayout";
import { flashMessage } from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { IconArrowLeft, IconCategory } from "@tabler/icons-react";
import React, { useRef } from "react";
import { toast } from "sonner";

const Edit = ({ category, page_setting }) => {
    const fileInputCover = useRef(null);
    const { data, setData, reset, post, processing, errors } = useForm({
        name: category.name ?? "",
        description: category.description ?? "",
        cover: null,
        _method: page_setting.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_setting.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    const onHandleReset = () => {
        reset();
        fileInputCover.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
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
                    <Link href={route("admin.categories.index")}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6 ">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                placeholder="masukkan nama"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && (
                                <InputError message={errors.name} />
                            )}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                name="description"
                                id="description"
                                placeholder="masukkan deskripsi"
                                value={data.description}
                                onChange={onHandleChange}
                            ></Textarea>
                            {errors.description && (
                                <InputError message={errors.description} />
                            )}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cover">Cover</Label>
                            <Input
                                name="cover"
                                id="cover"
                                type="file"
                                onChange={
                                    (e) =>
                                        setData(
                                            e.target.name,
                                            e.target.files[0]
                                        ) //input file
                                }
                                ref={fileInputCover}
                            />
                            {errors.cover && (
                                <InputError message={errors.cover} />
                            )}
                            <div className="flex justify-end gap-x-2 ">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="lg"
                                    onClick={onHandleReset}
                                >
                                    Reset
                                </Button>
                                <Button type="submit" variant="blue" size="lg">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Edit.layout = (page) => (
    <AppLayout children={page} title={page.props.page_setting.title} />
);
export default Edit;

import HeaderTitle from "@/Components/HeaderTitle";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import AppLayout from "@/Layouts/AppLayout";
import { flashMessage } from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { IconArrowLeft, IconBuildingCommunity } from "@tabler/icons-react";
import React, { useRef } from "react";
import { toast } from "sonner";

const Create = (props) => {
    const fileInputLogo = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.publisher.name ?? "",
        address: props.publisher.address ?? "",
        email: props.publisher.email ?? "",
        phone: props.publisher.phone ?? "",
        logo: null,
        _method: props.page_setting.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_setting.action, {
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
        fileInputLogo.current.value = null;
    };

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-center justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route("admin.publishers.index")}>
                        <IconArrowLeft size="4" />
                        Kembali
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="masukkan nama..."
                                onChange={onHandleChange}
                                value={data.name}
                            />
                            {errors.name && (
                                <InputError message={errors.name} />
                            )}
                        </div>

                        <div className="grid w-full items-center mt-1 gap-1.5">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                name="address"
                                id="address"
                                placeholder="masukkan alamat disini..."
                                value={data.address}
                                onChange={onHandleChange}
                            />
                            {errors.address && (
                                <InputError message={errors.address} />
                            )}
                        </div>

                        <div className="grid w-full mt-1 items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="masukkan email..."
                                onChange={onHandleChange}
                                value={data.email}
                            />
                            {errors.email && (
                                <InputError message={errors.email} />
                            )}
                        </div>

                        <div className="grid w-full mt-1 items-center gap-1.5">
                            <Label htmlFor="phone">Nomor Handphone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="masukkan nomor..."
                                onChange={onHandleChange}
                                value={data.phone}
                            />
                            {errors.phone && (
                                <InputError message={errors.phone} />
                            )}
                        </div>

                        <div className="grid w-full mt-1 items-center gap-1.5">
                            <Label htmlFor="logo">Logo</Label>
                            <Input
                                id="logo"
                                name="logo"
                                type="file"
                                ref={fileInputLogo}
                                onChange={(e) =>
                                    setData("logo", e.target.files[0])
                                }
                            />
                            {errors.logo && (
                                <InputError message={errors.logo} />
                            )}
                        </div>

                        <div className="flex justify-end gap-x-2 ">
                            <Button
                                type="button"
                                variant="ghost"
                                size="lg"
                                onClick={onHandleReset}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                variant="blue"
                                size="lg"
                                disabled={processing}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Create.layout = (page) => (
    <AppLayout children={page} title={page.props.page_setting.title} />
);

export default Create;

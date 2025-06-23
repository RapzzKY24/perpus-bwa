import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import ComboBox from '@/Components/ui/combo-box';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';

import { IconArrowLeft, IconRoute } from '@tabler/icons-react';
import { toast } from 'sonner';

const Create = (props) => {
    const { data, setData, reset, post, processing, errors } = useForm({
        route_name: props.routeAccess.route_name ?? null,
        role: props.routeAccess.role?.name ?? null,
        permission: props.routeAccess.permission?.name ?? null,
        _method: props.page_setting.method,
    });

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
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title={props.page_setting.title} subtitle={props.page_setting.subtitle} icon={IconRoute} />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.route-accesses.index')}>
                        <IconArrowLeft size="4" />
                        Kembali
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="route_name">Rute</Label>
                            <ComboBox
                                items={props.routes.filter((route) => route.value !== null)}
                                selectedItem={data.route_name}
                                onSelect={(currentValue) => setData('route_name', currentValue)}
                            />
                            {errors.route_name && <InputError message={errors.route_name} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="role">Peran</Label>
                            <ComboBox
                                items={props.roles}
                                selectedItem={data.role}
                                onSelect={(currentValue) => setData('role', currentValue)}
                            />
                            {errors.role && <InputError message={errors.role} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="permission">Izin</Label>
                            <ComboBox
                                items={props.permissions}
                                selectedItem={data.permission}
                                onSelect={(currentValue) => setData('permission', currentValue)}
                            />
                            {errors.permission && <InputError message={errors.permission} />}
                        </div>

                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="blue" size="lg" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Create.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;

export default Create;

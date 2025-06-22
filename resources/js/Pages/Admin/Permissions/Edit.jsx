import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconVersions } from '@tabler/icons-react';
import { toast } from 'sonner';

const Edit = (props) => {
    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.permissions.name ?? '',
        guard_name: 'web',
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
    };
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconVersions}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.roles.index')}>
                        <IconArrowLeft size="4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="spaca-y-6" onSubmit={onHandleSubmit}>
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
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="guard_name">Masukkan Guard</Label>
                            <Select
                                defaultValue={data.guard_name}
                                onValueChange={($value) => setData('guard_name', $value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {['web', 'api'].find((guard) => guard == data.guard_name) ?? 'Pilih Guard'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {['web', 'api'].map((guard, index) => (
                                        <SelectItem value={guard} key={index}>
                                            {guard.charAt(0).toUpperCase() + guard.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.guard_name && <InputError message={errors.guard_name} />}
                        </div>
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            {errors.cover && <InputError message={errors.cover} />}
                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
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

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Edit;

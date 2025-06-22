import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconUsersGroup } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

const Create = (props) => {
    const fileInputAvatar = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        password: '',
        password_confirmation: '',
        email: '',
        address: '',
        date_of_birth: '',
        phone: '',
        gender: null,
        avatar: null,
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
        fileInputAvatar.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconUsersGroup}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.users.index')}>
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
                            {errors.name && <InputError message={errors.name} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="masukkan email..."
                                onChange={onHandleChange}
                                value={data.email}
                            />
                            {errors.email && <InputError message={errors.email} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="masukkan password..."
                                onChange={onHandleChange}
                                value={data.password}
                            />
                            {errors.password && <InputError message={errors.password} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                placeholder="masukkan password konfirmasi..."
                                onChange={onHandleChange}
                                value={data.password_confirmation}
                            />
                            {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                name="address"
                                id="address"
                                placeholder="masukkan alamat disini..."
                                value={data.address}
                                onChange={onHandleChange}
                            />
                            {errors.address && <InputError message={errors.address} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Nomor Handphone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="masukkan nomor..."
                                onChange={onHandleChange}
                                value={data.phone}
                            />
                            {errors.phone && <InputError message={errors.phone} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="gender">Jenis Kelamin</Label>
                            <Select value={data.gender} onValueChange={(value) => setData('gender', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.page_data.genders.find((gender) => gender.value == data.gender)?.label ??
                                            'Pilih Jenis Kelamin'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.genders.map((gender, index) => (
                                        <SelectItem key={index} value={gender.value}>
                                            {gender.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.gender && <InputError message={errors.gender} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                            <Input
                                id="date_of_birth"
                                name="date_of_birth"
                                type="date"
                                onChange={onHandleChange}
                                value={data.date_of_birth}
                            />
                            {errors.date_of_birth && <InputError message={errors.date_of_birth} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input
                                id="avatar"
                                name="avatar"
                                type="file"
                                ref={fileInputAvatar}
                                onChange={(e) => setData('avatar', e.target.files[0])}
                            />
                            {errors.avatar && <InputError message={errors.avatar} />}
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

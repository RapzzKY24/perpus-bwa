import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react';
import { toast } from 'sonner';

const Edit = (props) => {
    const { data, setData, reset, post, processing, errors } = useForm({
        message: props.announcements.message ?? '',
        url: props.announcements.url ?? '',
        is_active: false,
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
                    icon={IconAlertCircle}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.announcements.index')}>
                        <IconArrowLeft size="4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="spaca-y-6" onSubmit={onHandleSubmit}>
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="message">Pesan</Label>
                            <Textarea
                                name="message"
                                id="message"
                                placeholder="masukkan pesan anda...."
                                value={data.message}
                                onChange={onHandleChange}
                            ></Textarea>
                            {errors.message && <InputError message={errors.message} />}
                        </div>
                        <div className="mt-2 grid w-full items-center gap-1.5">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                id="url"
                                name="url"
                                type="text"
                                placeholder="masukkan url..."
                                onChange={onHandleChange}
                                value={data.url}
                            />
                            {errors.url && <InputError message={errors.url} />}
                        </div>
                        <div className="mt-4 grid w-full items-center gap-1.5">
                            <div className="item-top flex space-x-2">
                                <Checkbox
                                    id="is_active"
                                    name="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="is_active">Apakah Aktif</Label>
                                </div>
                            </div>
                            {errors.is_active && <InputError message={errors.is_active} />}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="blue" size="lg">
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Edit;

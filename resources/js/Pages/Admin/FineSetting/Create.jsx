import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconSettingsExclamation } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

const Create = (props) => {
    const fileInputCover = useRef(null);
    const { data, setData, reset, post, processing, errors } = useForm({
        late_fee_per_day: props.fine_setting?.late_fee_per_day ?? 0,
        damaged_fee_percented: props.fine_setting?.damaged_fee_percented ?? 0,
        lost_fee_percented: props.fine_setting?.lost_fee_percented ?? 0,
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
        fileInputCover.current.value = null;
    };
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconSettingsExclamation}
                />
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="spaca-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="late_fee_per_day">Denda Keterlambatan</Label>
                            <Input
                                id="late_fee_per_day"
                                name="late_fee_per_day"
                                type="number"
                                onChange={onHandleChange}
                                value={data.late_fee_per_day}
                            />
                            {errors.late_fee_per_day && <InputError message={errors.late_fee_per_day} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="damaged_fee_percented">Denda Rusak(%)</Label>
                            <Input
                                id="damaged_fee_percented"
                                name="damaged_fee_percented"
                                type="number"
                                onChange={onHandleChange}
                                value={data.damaged_fee_percented}
                            />
                            {errors.damaged_fee_percented && <InputError message={errors.damaged_fee_percented} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="lost_fee_percented">Denda Hilang(%)</Label>
                            <Input
                                id="lost_fee_percented"
                                name="lost_fee_percented"
                                type="number"
                                onChange={onHandleChange}
                                value={data.lost_fee_percented}
                            />
                            {errors.lost_fee_percented && <InputError message={errors.lost_fee_percented} />}
                        </div>

                        {errors.cover && <InputError message={errors.cover} />}
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

Create.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Create;

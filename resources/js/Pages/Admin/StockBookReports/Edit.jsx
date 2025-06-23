import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCategory2 } from '@tabler/icons-react';
import { toast } from 'sonner';

const Edit = (props) => {
    const { data, setData, reset, put, processing, errors } = useForm({
        total: props.stocks.total ?? 0,
        loan: props.stocks.loan ?? 0,
        lost: props.stocks.lost ?? 0,
        damaged: props.stocks.damaged ?? 0,
        available: props.stocks.available ?? 0,
        _method: props.method,
    });

    const calculateMinimunTotal = (available, loan, lost, damaged) => {
        return available + loan + lost + damaged;
    };

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        const newValue = parseInt(value, 10) || 0;
        setData((prevData) => {
            if (name == 'total') {
                const minimumTotal = calculateMinimunTotal(
                    prevData.available,
                    prevData.loan,
                    prevData.lost,
                    prevData.damaged,
                );
                const validTotal = newValue >= minimumTotal ? newValue : minimumTotal;
                const totalDiff = validTotal - prevData.total;
                const newAvailable = prevData.available + totalDiff;
                return { ...prevData, total: validTotal, available: newAvailable >= 0 ? newAvailable : 0 };
            }
        });
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        put(props.page_setting.action, {
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
                    icon={IconCategory2}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.stock-book-reports.index')}>
                        <IconArrowLeft size="4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="spaca-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="total">Total</Label>
                            <Input id="total" name="total" type="number" onChange={onHandleChange} value={data.total} />
                            {errors.total && <InputError message={errors.total} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="available">Tersedia</Label>
                            <Input
                                id="available"
                                name="available"
                                type="number"
                                onChange={onHandleChange}
                                value={data.available}
                                disabled
                            />
                            {errors.available && <InputError message={errors.available} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="lost">Hilang</Label>
                            <Input
                                id="lost"
                                name="lost"
                                type="number"
                                onChange={onHandleChange}
                                disabled
                                value={data.lost}
                            />
                            {errors.lost && <InputError message={errors.lost} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="loan">Dipinjam</Label>
                            <Input
                                id="loan"
                                name="loan"
                                type="number"
                                onChange={onHandleChange}
                                disabled
                                value={data.loan}
                            />
                            {errors.loan && <InputError message={errors.loan} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="damaged">Rusak</Label>
                            <Input
                                id="damaged"
                                name="damaged"
                                type="number"
                                onChange={onHandleChange}
                                disabled
                                value={data.damaged}
                            />
                            {errors.damaged && <InputError message={errors.damaged} />}
                        </div>

                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                    Reset
                                </Button>
                                <Button type="submit" variant="green" size="lg">
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

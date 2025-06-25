import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/Components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { Textarea } from '@/Components/ui/textarea';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { SelectValue } from '@radix-ui/react-select';
import { IconChecklist } from '@tabler/icons-react';
import { toast } from 'sonner';

const Approve = ({ conditions, action }) => {
    const { data, setData, errors, put, processing } = useForm({
        condition: null,
        notes: '',
        _method: 'PUT',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        put(action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    return (
        <div className="">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="green" size="sm">
                        <IconChecklist className="size-5 text-white" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Konfirmasi Kondisi Buku</SheetTitle>
                        <SheetDescription>
                            {' '}
                            Periksa Kondisi Buku Sesuai Dengan Buku Yang Dikembalikan Member
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={onHandleSubmit} className="mt-4 space-x-6">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="condition">Kondisi Buku</Label>
                            <Select
                                defaultValue={data.condition}
                                onValueChange={(value) => setData('condition', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {conditions.find((condition) => condition.value == data.condition)?.label ??
                                            'Pilih Kondisi Buku'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {conditions.map((condition, index) => (
                                        <SelectItem key={index} value={condition.value}>
                                            {condition.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.condition && <InputError message={errors.condition} />}

                            <Label htmlFor="notes">Catatan</Label>
                            <Textarea
                                name="notes"
                                id="notes"
                                tpye="text"
                                onChange={(e) => setData(e.target.name, e.target.valu)}
                                placholder="Masukkan Catatan"
                                value={data.notes}
                            ></Textarea>
                            {errors.notes && <InputError message={errors.notes} />}
                            <Button type="submit" variant="blue" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Approve;

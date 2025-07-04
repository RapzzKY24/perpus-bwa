import GetFineStatusBadge from '@/Components/GetFineStatusBadge';
import HeaderTitle from '@/Components/HeaderTitle';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { FINEPAYMENTSTATUS, formatToRupiah } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { IconCircleCheck, IconCircleKey } from '@tabler/icons-react';
import axios from 'axios';
import { toast } from 'sonner';

const Show = (props) => {
    const { SUCCESS } = FINEPAYMENTSTATUS;

    const handlePayment = async () => {
        try {
            const response = await axios.post(route('payments.create'), {
                order_id: props.return_book.return_book_code,
                gross_amount: props.return_book.fine.total_fee,
                first_name: props.return_book.user.name,
                last_name: '',
                email: props.return_book.user.email,
            });

            const snapToken = response.data.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: (result) => {
                    toast['success']('pembayaran sukses');
                    router.get(route('payments.success'));
                },
                onPending: (result) => toast['warning']('Pembayaran Pending'),
                onError: (result) => toast['error']('Kesalahan Pembayaran'),
                onClose: (result) => toast['info']('Pembayaran Ditutup'),
            });
        } catch (err) {
            toast['error'](`Kesalahan pembayaran ${err}`);
        }
    };

    return (
        <div className="flex w-full flex-col space-y-4 pb-32">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconCircleKey}
                />
            </div>
            <Card>
                <CardHeader className="border-mute flex flex-col gap-6 border-b px-6 text-sm lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <dt className="font-medium text-foreground">Kode Peminjaman</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.loan.loan_code}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-foreground">Peminjam</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.user.name}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-foreground">Tangal Peminjaman</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.loan.loan_date}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-foreground">Kode Pengembalian</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.return_book_code}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-foreground">Status</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.status}</dd>
                    </div>
                </CardHeader>
                <CardContent className="divide-y divide-gray-600 py-6">
                    <div className="flex items-center lg:items-start">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 lg:h-40 lg:w-40">
                            <img
                                src={props.return_book.book.cover}
                                alt={props.return_book.book.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="ml-6 flex-1 text-sm">
                            <h5 className="text-sm font-bold leading-relaxed">
                                {props.return_book.book.title}

                                <p className="hidden text-muted-foreground lg:mt-2 lg:block">
                                    {props.return_book.book.synopsis}
                                </p>
                            </h5>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center">
                        <IconCircleCheck className="size-4 text-green-500" />
                        <p className="ml-2 text-sm font-medium text-muted-foreground">
                            Dikembalikan pada tanggal{' '}
                            <time datetime={props.return_book.return_date}>{props.return_book.return_date}</time>
                        </p>
                    </div>
                    <div className="flex pt-6 text-sm font-medium lg:items-center lg:border-none lg:pt-0">
                        <div className="flex flex-1 justify-center">
                            <Button variant="link">
                                <Link href={route('front.books.show', [props.return_book.book.slug])}>Lihat Buku</Link>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            {props.return_book.fine && (
                <h2 className="font-semibold leading-relaxed text-foreground">Informasi Denda</h2>
            )}

            {props.return_book.fine && props.return_book.fine.payment_status !== SUCCESS && (
                <Alert variant="destructive">
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>
                        Setelah Melalui Pengecekan Peminjaman Buku Anda Terkena Denda.Harap Melunasi Pembayaran Denda
                        Terlebih dahlu
                    </AlertDescription>
                </Alert>
            )}

            {props.return_book.fine && (
                <Card>
                    <CardContent className="space-y-20 p-6">
                        <div>
                            <div className="rounded-lg px-4 py-6">
                                <dl className="flex flex-col gap-x-12 gap-y-4 text-sm leading-relaxed text-foreground lg:flex-row">
                                    <div className="flex flex-col">
                                        <dt className="font-semibold">Kode Peminjaman</dt>
                                        <dd>{props.return_book.loan.loan_code}</dd>
                                    </div>
                                    <div className="flex flex-col">
                                        <dt className="font-semibold">Tanggal Peminjaman</dt>
                                        <dd>
                                            <time datetime={props.return_book.loan.loan_date}>
                                                {props.return_book.loan.loan_date}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className="flex flex-col">
                                        <dt className="font-semibold">Batas Pengembalian</dt>
                                        <dd>
                                            <time datetime={props.return_book.loan.due_date}>
                                                {props.return_book.loan.due_date}
                                            </time>
                                        </dd>
                                    </div>
                                    <div className="flex flex-col">
                                        <dt className="font-semibold">Total Denda</dt>
                                        <dd>{formatToRupiah(props.return_book.fine.total_fee)}</dd>
                                    </div>
                                </dl>
                            </div>
                            <Table className="mt-6 w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Pengguna</TableHead>
                                        <TableHead>Buku</TableHead>
                                        <TableHead>Denda Keterlambatan</TableHead>
                                        <TableHead>Denda Lainnya</TableHead>
                                        <TableHead>Total Denda</TableHead>
                                        <TableHead>Status Pembayaran</TableHead>
                                        {props.return_book.fine.payment_status !== 'success' && (
                                            <TableHead>Aksi</TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{props.return_book.user.name}</TableCell>
                                        <TableCell>{props.return_book.book.title}</TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_book.fine.late_fee)}
                                            <span className="text-red-600">({props.return_book.dayslate})</span>
                                        </TableCell>
                                        <TableCell>{formatToRupiah(props.return_book.fine.other_fee)}</TableCell>
                                        <TableCell>
                                            {formatToRupiah(props.return_book.fine.total_fee)}
                                            <span className="text-red-600">
                                                ({props.return_book.return_book_check.condition})
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <GetFineStatusBadge status={props.return_book.fine.payment_status} />
                                        </TableCell>
                                        {props.return_book.fine.payment_status !== SUCCESS && (
                                            <TableCell>
                                                <Button variant="outline" onClick={handlePayment}>
                                                    Bayar
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <p className="mt-12 text-sm">
                                <span className="font-medium">Catatan</span>
                                {props.return_book.return_book_check.notes}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

Show.layout = (page) => <AppLayout title={page.props.page_setting.title} children={page}></AppLayout>;

export default Show;

import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Link } from '@inertiajs/react';
import { IconCircleCheck } from '@tabler/icons-react';

const Success = () => {
    return (
        <>
            <Head title="Pembayaran Sukses" />
            <div className="flex min-h-screen items-center justify-center">
                <div className="mx-auto max-w-sm">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-x-2">
                            <IconCircleCheck className="text-green-500" />
                            <div>
                                <CardTitle>Berhasil</CardTitle>
                                <CardDescription>Pembayaran Sukses Diproses</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-y-6">
                            <p className="items-start text-foreground">
                                Terima Kasih Telah Menyelesaikan Pembayaran Denda. Kami Dengan Hati Mengkonfirmasi Bahwa
                                Transaksi Anda Berhasil di Proses
                            </p>
                            <Button asChild variant="blue">
                                <Link href={route('dashboard')}>Kembali</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Success;

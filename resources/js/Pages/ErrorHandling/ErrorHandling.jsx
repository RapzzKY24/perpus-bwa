import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { message } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';

const ErrorHandling = ({ status }) => {
    const ErrorMessage = message[status];

    return (
        <>
            <Head title={ErrorMessage.title} />
            <div className="grid min-h-full bg-white px-6 py-24 text-center sm:px-32 lg:px-8">
                <Card className="text-center">
                    <CardContent className="p-8">
                        <p className="text-base font-semibold text-indigo-600">{ErrorMessage.status}</p>
                        <h1 className="mt-4 text-5xl font-bold tracking-tighter text-foreground">
                            {ErrorMessage.title}
                        </h1>
                        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                            {ErrorMessage.description}
                        </p>
                        <div className="mt-10 flex items-start justify-center gap-x-6">
                            <Button variant="blue" asChild>
                                <Link href="/">Kembali ke Halaman Awal</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ErrorHandling;

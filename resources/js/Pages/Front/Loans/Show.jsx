import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';

import { Link } from '@inertiajs/react';
import { IconCircleCheck, IconCreditCardPay } from '@tabler/icons-react';

const Show = (props) => {
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconCreditCardPay}
                />
            </div>
            <Card>
                <CardHeader className="border-mute flex flex-col gap-6 border-b px-6 text-sm lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <dt className="font-medium text-foreground">Kode Peminjaman</dt>
                        <dd className="mt-1 text-muted-foreground">{props.loan.loan_code}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-foreground">Peminjam</dt>
                        <dd className="mt-1 text-muted-foreground">{props.loan.user.name}</dd>
                    </div>
                    <div>
                        <dt className="font-medium text-foreground">Tangal Peminjaman</dt>
                        <dd className="mt-1 text-muted-foreground">{props.loan.loan_date}</dd>
                    </div>
                </CardHeader>
                <CardContent className="divide-y divide-gray-600 py-6">
                    <div className="flex items-center lg:items-start">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 lg:h-40 lg:w-40">
                            <img
                                src={props.loan.book.cover}
                                alt={props.loan.book.title}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="ml-6 flex-1 text-sm">
                            <h5 className="text-sm font-bold leading-relaxed">
                                {props.loan.book.title}
                                <p className="hidden text-muted-foreground lg:mt-2 lg:block">
                                    {props.loan.book.synopsis}
                                </p>
                            </h5>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center">
                        <IconCircleCheck className="size-4 text-green-500" />
                        <p className="ml-2 text-sm font-medium text-muted-foreground">
                            Kembalikan sebelum <time datetime={props.loan.due_date}>{props.loan.due_date}</time>
                        </p>
                    </div>
                    <div className="flex pt-6 text-sm font-medium lg:items-center lg:border-none lg:pt-0">
                        <div className="flex flex-1 justify-center">
                            <Button variant="link">
                                <Link href={route('front.books.show', [props.loan.book.slug])}>Lihat Buku</Link>
                            </Button>
                            {!props.loan.return_book && (
                                <Button variant="blue" onClick={() => console.log('kembalikan')}>
                                    Kembalikan
                                </Button>
                            )}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

Show.layout = (page) => <AppLayout title={page.props.page_setting.title} children={page}></AppLayout>;

export default Show;

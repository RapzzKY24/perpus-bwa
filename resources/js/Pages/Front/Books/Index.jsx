import BookCard from '@/Components/BookCard';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { IconBook2 } from '@tabler/icons-react';

const Index = (props) => {
    return (
        <div className="flex w-full flex-col space-y-6 pb-32">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title={props.page_setting.title} subtitle={props.page_setting.subtitle} icon={IconBook2} />
            </div>
            <div>
                {props.categories.map((category, index) => (
                    <div key={index} className="py-2">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold leading-relaxed text-foreground">{category.name}</h2>
                            <Button variant="link" asChild>
                                <Link href="#">Lihat Semua</Link>
                            </Button>
                        </div>
                        <div className="grid gap-4 border-b border-dashed border-muted py-10 md:gap-8 lg:grid-cols-4">
                            {category.books.map((book, index) => (
                                <BookCard item={book} key={index} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Index;

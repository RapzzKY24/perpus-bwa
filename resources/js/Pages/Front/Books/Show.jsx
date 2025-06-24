import { Button } from '@/Components/ui/button';
import AppLayout from '@/Layouts/AppLayout';

const Show = ({ book, page_setting }) => {
    return (
        <div className="flex w-full flex-col space-y-10 pb-32 pt-10">
            <div className="grid gap-10 lg:grid-cols-7">
                <div className="lg:col-span-3">
                    <div className="aspect-h-3 aspect-w-2 max-w-sm overflow-hidden rounded-xl bg-muted shadow-lg">
                        <img src={book.cover} alt={book.title} className="h-full w-full object-cover object-center" />
                    </div>
                </div>

                <div className="flex flex-col justify-between lg:col-span-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">{book.title}</h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Ditambahkan pada <time dateTime={book.created_at}>{book.created_at}</time>
                        </p>
                        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                            <h2 className="text-lg font-semibold text-foreground">Sinopsis</h2>
                            <p>{book.synopsis || 'Belum ada sinopsis yang tersedia.'}</p>
                        </div>
                        <div className="mt-10 flex">
                            {book.stock.available > 0 ? (
                                <Button size="lg" variant="blue" onClick={() => console.log('Pinjam ya')}>
                                    Pinjam Sekarang
                                </Button>
                            ) : (
                                <Button size="lg" variant="blue" onClick={() => console.log('Pinjam ya')}>
                                    Buku Habis
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col justify-start gap-10 border-t border-gray-200 pt-10 lg:flex-row">
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Tahun Publikasi</h3>
                                <p className="mt-4 text-sm text-muted-foreground">{book.publication_year}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-foreground">ISBN</h3>
                                <p className="mt-4 text-sm text-muted-foreground">{book.isbn}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Jumlah Halaman</h3>
                                <p className="mt-4 text-sm text-muted-foreground">{book.number_of_pages}</p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-10 border-t border-gray-200 pt-10 lg:flex-row">
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Penulis</h3>
                                <p className="mt-4 text-sm text-muted-foreground">{book.author}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Kategori</h3>
                                <p className="mt-4 text-sm text-muted-foreground">{book.category.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-foreground">Penerbit</h3>
                                <p className="mt-4 text-sm text-muted-foreground">{book.publisher.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Show.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Show;

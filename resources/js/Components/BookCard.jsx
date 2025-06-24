import { Link } from '@inertiajs/react';

const BookCard = ({ item }) => {
    return (
        <div className="group relative cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-muted/40 shadow-md transition-all duration-300 hover:scale-105">
                <Link href={route('front.books.show', [item.slug])}>
                    <img
                        src={item.cover}
                        alt={item.title}
                        className="h-64 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="z-10 mb-4 rounded-md bg-white/80 px-4 py-2 text-sm font-semibold text-foreground shadow backdrop-blur-md">
                            Lihat Buku
                        </div>
                    </div>
                </Link>
            </div>
            <div className="mt-4 flex items-center justify-between text-base font-medium leading-relaxed text-foreground">
                <h3 className="line-clamp-1">
                    <Link href={route('front.books.show', [item.slug])} className="hover:underline">
                        {item.title}
                    </Link>
                </h3>
            </div>
            <div>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed tracking-tighter text-muted-foreground">
                    {item.synopsis}
                </p>
            </div>
        </div>
    );
};

export default BookCard;

import { Link } from '@inertiajs/react';

const CategoryCard = ({ item }) => {
    return (
        <Link
            href={route('front.categories.show', [item.slug])}
            className="xl:w-aut relative flex h-80 w-full flex-col rounded-lg p-8 hover:opacity-75"
        >
            <span className="absolute inset-0">
                <img
                    src={item.cover ? item.cover : 'https://placehold.co/600x400/png'}
                    alt={item.name}
                    className="h-full w-full object-cover object-top"
                />
            </span>
            <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-r from-gray-200 opacity-50" />
            <span className="relative mt-auto text-center text-xl font-bold text-white">{item.name}</span>
        </Link>
    );
};

export default CategoryCard;

import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';

import { IconArrowLeft, IconBooks } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

const Edit = (props) => {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        title: props.book.title ?? '',
        author: props.book.author ?? '',
        publication_year: props.book.publication_year ?? null,
        isbn: props.book.isbn ?? '',
        language: props.book.language ?? null,
        synopsis: props.book.synopsis ?? '',
        number_of_pages: props.book.number_of_page ?? '',
        cover: props.book.cover ?? null,
        category_id: props.book.category_id ?? null,
        price: props.book.price ?? 0,
        publisher_id: props.book.publisher_id ?? null,
        _method: props.page_setting.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_setting.action, {
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
        fileInputCover.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle title={props.page_setting.title} subtitle={props.page_setting.subtitle} icon={IconBooks} />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route('admin.books.index')}>
                        <IconArrowLeft size="4" />
                        Kembali
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        {/* input title start */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="title">Judul</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="masukkan judul Buku..."
                                onChange={onHandleChange}
                                value={data.title}
                            />
                            {errors.title && <InputError message={errors.title} />}
                        </div>
                        {/* input title end */}

                        {/* input author start */}
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="author">Penulis</Label>
                            <Input
                                name="author"
                                id="author"
                                placeholder="masukkan penulis..."
                                value={data.author}
                                onChange={onHandleChange}
                            />
                            {errors.author && <InputError message={errors.author} />}
                        </div>
                        {/* input author end */}

                        {/* input publication_year start */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="publication_year">Tahun Publikasi</Label>
                            <Select
                                value={data.publication_year}
                                onValueChange={(value) => setData('publication_year', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.page_data.publicationYears.find(
                                            (publication_year) => publication_year == data.publication_year,
                                        ) ?? 'Pilih tahun terbit'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.publicationYears.map((year, index) => (
                                        <SelectItem key={index} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.publication_year && <InputError message={errors.publication_year} />}
                        </div>
                        {/* input publication_year end */}

                        {/* input isbn start  */}
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="isbn">ISBN(Internasional Standard Book Number)</Label>
                            <Input
                                id="isbn"
                                name="isbn"
                                type="text"
                                placeholder="masukkan isbn..."
                                onChange={onHandleChange}
                                value={data.isbn}
                            />
                            {errors.isbn && <InputError message={errors.isbn} />}
                        </div>
                        {/* input isbn end  */}

                        {/* input bahasa start */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="language">Bahasa</Label>
                            <Select value={data.language} onValueChange={(value) => setData('language', value)}>
                                <SelectTrigger>
                                    <SelectValue className="text-left">
                                        {props.page_data.languages.find((language) => language.value == data.language)
                                            ?.label ?? 'Pilih Bahasa'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.languages.map((language, index) => (
                                        <SelectItem key={index} value={language.value}>
                                            {language.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.language && <InputError message={errors.language} />}
                        </div>
                        {/* input bahasa end */}

                        {/* input synopsis start */}
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="synopsis">Sinopsis</Label>
                            <Textarea
                                id="synopsis"
                                name="synopsis"
                                type="text"
                                placeholder="masukkan sinopsis..."
                                onChange={onHandleChange}
                                value={data.synopsis}
                            />
                            {errors.synopsis && <InputError message={errors.synopsis} />}
                        </div>
                        {/* input synopsis end */}

                        {/* jumlah halaman start */}
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="number_of_pages">Jumlah Halaman</Label>
                            <Input
                                id="number_of_pages"
                                name="number_of_pages"
                                type="number"
                                placeholder="jumlah halaman..."
                                onChange={onHandleChange}
                                value={data.number_of_pages}
                            />
                            {errors.number_of_pages && <InputError message={errors.number_of_pages} />}
                        </div>
                        {/* jumlah halaman end */}

                        {/*  price input start*/}
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="price">Harga</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                placeholder="masukkan harga..."
                                onChange={onHandleChange}
                                value={data.price}
                            />
                            {errors.price && <InputError message={errors.price} />}
                        </div>
                        {/*  price input end*/}

                        {/* categories id start */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="category_id">Kategori</Label>
                            <Select
                                defaultValue={data.category_id}
                                onValueChange={(value) => setData('category_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue className="text-left">
                                        {props.page_data.categories.find(
                                            (category) => category.value == data.category_id,
                                        )?.label ?? 'Pilih Kategori'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.categories.map((category, index) => (
                                        <SelectItem key={index} value={String(category.value)}>
                                            {category.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <InputError message={errors.category_id} />}
                        </div>
                        {/* categories id end */}

                        {/* puublisher start */}
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="publisher_id">Penerbit</Label>
                            <Select
                                defaultValue={data.publisher_id}
                                onValueChange={(value) => setData('publisher_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue className="text-left">
                                        {props.page_data.publishers.find(
                                            (publisher) => publisher.value == data.publisher_id,
                                        )?.label ?? 'Pilih Penerbit'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.publishers.map((publisher, index) => (
                                        <SelectItem key={index} value={String(publisher.value)}>
                                            {publisher.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.publisher_id && <InputError message={errors.publisher_id} />}
                        </div>
                        {/* publishers end */}

                        {/* cover start */}
                        <div className="mt-1 grid w-full items-center gap-1.5">
                            <Label htmlFor="cover">Cover</Label>
                            <Input
                                id="cover"
                                name="cover"
                                type="file"
                                ref={fileInputCover}
                                onChange={(e) => setData('cover', e.target.files[0])}
                            />
                            {errors.cover && <InputError message={errors.cover} />}
                        </div>
                        {/* cover end */}

                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="blue" size="lg" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;

export default Edit;

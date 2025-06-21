import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="h-screen w-full overflow-hidden lg:grid lg:grid-cols-2">
            {/* Kiri - Form */}
            <div className="flex flex-col px-6 py-4">
                <ApplicationLogo size="size-12" />

                <div className="flex flex-1 flex-col items-center justify-center py-12">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Daftar</h1>
                            <p className="text-muted-foreground">Buat akun baru untuk mulai menggunakan aplikasi.</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                {/* Nama */}
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="name" value="Nama" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        autoFocus
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Konfirmasi Password */}
                                <div className="grid gap-2">
                                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                {/* Tombol + Link Login */}
                                <div className="text-center text-sm">
                                    Sudah punya akun?{' '}
                                    <Link href={route('login')} className="underline">
                                        Masuk
                                    </Link>
                                </div>
                                <Button type="submit" variant="blue" size="xl" className="w-full" disabled={processing}>
                                    Daftar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Kanan - Gambar */}
            <div className="hidden bg-muted lg:block">
                <img src="/images/login.webp" alt="register" className="h-full w-full object-cover" />
            </div>
        </div>
    );
}

Register.layout = (page) => <GuestLayout title="Register">{page}</GuestLayout>;

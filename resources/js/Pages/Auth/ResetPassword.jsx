import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-2">
            {/* Kiri - Form */}
            <div className="flex flex-col px-6 py-4">
                <div className="flex flex-col items-center justify-center flex-1 py-12">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        {/* Heading */}
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                Reset Password
                            </h1>
                            <p className="text-muted-foreground">
                                Masukkan password baru untuk mengganti yang
                                lama.
                            </p>
                        </div>

                        <form onSubmit={submit} className="grid gap-4">
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
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {/* Password Baru */}
                            <div className="grid gap-2">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password Baru"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            {/* Konfirmasi Password */}
                            <div className="grid gap-2">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Konfirmasi Password"
                                />
                                <TextInput
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <PrimaryButton
                                className="w-full"
                                disabled={processing}
                            >
                                Reset Password
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>

            {/* Kanan - Gambar */}
            <div className="hidden bg-muted lg:block">
                <img
                    src="/images/reset.webp"
                    alt="Reset Password"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

ResetPassword.layout = (page) => (
    <GuestLayout title="Reset Password">{page}</GuestLayout>
);

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-2">
            {/* Kiri - Form */}
            <div className="flex flex-col px-6 py-4">
                <div className="flex flex-col items-center justify-center flex-1 py-12">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                Konfirmasi Password
                            </h1>
                            <p className="text-muted-foreground">
                                Ini adalah area yang aman. Silakan konfirmasi
                                password Anda sebelum melanjutkan.
                            </p>
                        </div>

                        <form onSubmit={submit} className="grid gap-4">
                            <div className="grid gap-2">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
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

                            <PrimaryButton
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Konfirmasi
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>

            {/* Kanan - Gambar */}
            <div className="hidden bg-muted lg:block">
                <img
                    src="/images/confirm.webp"
                    alt="confirm password"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

ConfirmPassword.layout = (page) => (
    <GuestLayout title="Konfirmasi Password">{page}</GuestLayout>
);

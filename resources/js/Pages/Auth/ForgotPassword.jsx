import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
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
                                Lupa Password
                            </h1>
                            <p className="text-muted-foreground">
                                Masukkan email kamu dan kami akan kirimkan link
                                reset password.
                            </p>
                        </div>

                        {/* Status sukses */}
                        {status && (
                            <div className="text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="grid gap-4">
                            <div className="grid gap-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full"
                                    autoFocus
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="blue"
                                size="xl"
                                className="w-full"
                                disabled={processing}
                            >
                                Verify
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Kanan - Gambar */}
            <div className="hidden bg-muted lg:block">
                <img
                    src="/images/login.webp"
                    alt="forgot password"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

ForgotPassword.layout = (page) => (
    <GuestLayout title="Lupa Password">{page}</GuestLayout>
);

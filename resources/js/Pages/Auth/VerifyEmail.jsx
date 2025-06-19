import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-2">
            {/* Kiri - Konten */}
            <div className="flex flex-col px-6 py-4">
                <div className="flex flex-col items-center justify-center flex-1 py-12">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">
                                Verifikasi Email
                            </h1>
                            <p className="text-muted-foreground">
                                Terima kasih telah mendaftar! Sebelum mulai,
                                mohon verifikasi email kamu melalui tautan yang
                                telah dikirimkan.
                            </p>
                        </div>

                        {status === "verification-link-sent" && (
                            <div className="text-sm font-medium text-green-600 text-center">
                                Tautan verifikasi baru telah dikirim ke email
                                kamu.
                            </div>
                        )}

                        <form onSubmit={submit} className="grid gap-4">
                            <PrimaryButton
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Kirim Ulang Email Verifikasi
                            </PrimaryButton>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm underline text-center text-gray-600 hover:text-gray-900"
                            >
                                Keluar
                            </Link>
                        </form>
                    </div>
                </div>
            </div>

            {/* Kanan - Gambar */}
            <div className="hidden bg-muted lg:block">
                <img
                    src="/images/verify.webp"
                    alt="Verifikasi Email"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

VerifyEmail.layout = (page) => (
    <GuestLayout title="Verifikasi Email">{page}</GuestLayout>
);

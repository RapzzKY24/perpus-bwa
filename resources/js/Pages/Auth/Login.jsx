import ApplicationLogo from "@/Components/ApplicationLogo";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Checkbox } from "@/Components/ui/checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="w-full h-screen overflow-hidden lg:grid lg:grid-cols-2">
            {/* Kiri - Form */}
            <div className="flex flex-col px-6 py-4">
                <ApplicationLogo size="size-12" />

                <div className="flex flex-col items-center justify-center flex-1 py-12">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        {/* Status Message */}
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>
                                        {status}
                                    </AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-3xl font-bold">Masuk</h1>
                            <p className="text-muted-foreground">
                                Masukkan email di bawah ini untuk masuk ke akun
                                Anda.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={onHandleSubmit}>
                            <div className="grid gap-4">
                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        placeholder="johndoe@gmail.com"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <InputError message={errors.email} />
                                    )}
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="********"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <InputError message={errors.password} />
                                    )}
                                </div>

                                {/* Remember Me & Forgot */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) =>
                                                setData("remember", checked)
                                            }
                                        />
                                        <Label htmlFor="remember">
                                            Ingat saya
                                        </Label>
                                    </div>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm underline"
                                        >
                                            Lupa Password?
                                        </Link>
                                    )}
                                </div>
                                {errors.remember && (
                                    <InputError message={errors.remember} />
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="blue"
                                    size="xl"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    Masuk
                                </Button>
                            </div>
                        </form>

                        {/* Register link */}
                        <div className="text-center text-sm">
                            Belum punya akun?{" "}
                            <Link
                                href={route("register")}
                                className="underline"
                            >
                                Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Kanan - Gambar */}
            <div className="hidden bg-muted lg:block">
                <img
                    src="/images/login.webp"
                    alt="login"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

Login.layout = (page) => (
    <GuestLayout title="Login" children={page}></GuestLayout>
);

import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Profile Information</CardTitle>

                <CardDescription className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <Label htmlFor="name">Nama</Label>
                        <Input id="name" name="name" value={data.name} onChange={onHandleChange} autoComplete="name" />

                        {errors.name && <InputError className="mt-2" message={errors.name} />}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={onHandleChange}
                            autoComplete="username"
                        />

                        {errors.email && <InputError className="mt-2" message={errors.email} />}
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-foreground">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-muted-foreground underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <Alert variant="success">
                                    <AlertDescription>
                                        A new verification link has been sent to your email address.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing} variant="blue" size="lg">
                            Save
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-muted-foreground">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

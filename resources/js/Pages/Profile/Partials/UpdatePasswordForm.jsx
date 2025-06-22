import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground">Update Password</CardTitle>

                <CardDescription className="mt-1 text-sm text-muted-foreground">
                    Ensure your account is using a long, random password to stay secure.
                </CardDescription>
            </CardHeader>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="current_password">Current Password </Label>

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={onHandleChange}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    {errors.current_password && <InputError message={errors.current_password} />}
                </div>

                <div>
                    <Label htmlFor="password">New Password</Label>

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={onHandleChange}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    {errors.password && <InputError message={errors.password} />}
                </div>

                <div>
                    <Label htmlFor="password_confirmation">Confirm Password</Label>

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                </div>

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
        </Card>
    );
}

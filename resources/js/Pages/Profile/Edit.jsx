import HeaderTitle from '@/Components/HeaderTitle';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { IconUser } from '@tabler/icons-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit(props) {
    return (
        <>
            <div className="flex w-full flex-col pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_setting.title}
                        subtitle={props.page_setting.subtitle}
                        icon={IconUser}
                    />
                </div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={props.mustVerifyEmail}
                        status={props.status}
                        className="mb-8"
                    />
                </div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <UpdatePasswordForm className="mb-8" />
                </div>
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    <DeleteUserForm className="mb-8" />
                </div>
            </div>
            <div header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Profile</h2>}>
                <Head title="Profile" />
            </div>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} title="Edit Profile" />;

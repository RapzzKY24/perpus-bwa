import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return <div>Ini halaman dashboard</div>;
}

Dashboard.layout = (page) => <AppLayout title="Dashboard" children={page}></AppLayout>;

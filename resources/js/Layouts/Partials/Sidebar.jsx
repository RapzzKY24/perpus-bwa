import {
    IconAlertCircle,
    IconBook,
    IconBuildingCommunity,
    IconCategory,
    IconChartDots2,
    IconCircleKey,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconKeyframe,
    IconLayoutKanban,
    IconLogout,
    IconMoneybag,
    IconRoute,
    IconSettingsExclamation,
    IconStack3,
    IconUser,
    IconUsersGroup,
    IconVersions,
} from '@tabler/icons-react';

import NavLink from '@/Components/NavLink';

const Sidebar = ({ url, auth }) => {
    return (
        <>
            <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Dashboard
                    <NavLink
                        url={route('dashboard')}
                        title="Dashboard"
                        icon={IconDashboard}
                        active={url.startsWith('/dashboard')}
                    />
                </div>
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Statistik
                    <NavLink url="#" title="Statistik Peminjan" icon={IconChartDots2} />
                    <NavLink url="#" title=" Laporan Denda" icon={IconMoneybag} />
                    <NavLink url="#" title="Laporan Stok Buku" icon={IconStack3} />
                </div>
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Master
                    <NavLink
                        url={route('admin.categories.index')}
                        active={url.startsWith('/admin/categories')}
                        title="Kategori"
                        icon={IconCategory}
                    />
                    <NavLink
                        url={route('admin.publishers.index')}
                        active={url.startsWith('/admin/publishers')}
                        title="Penulis"
                        icon={IconBuildingCommunity}
                    />
                    <NavLink
                        url={route('admin.books.index')}
                        active={url.startsWith('/admin/books')}
                        title="Buku"
                        icon={IconBook}
                    />
                    <NavLink url="#" title="Pengguna" icon={IconUsersGroup} />
                    <NavLink url="#" title="Pengaturan Denda" icon={IconSettingsExclamation} />
                </div>
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Peran dan Izin
                    <NavLink url="#" title="Peran" icon={IconCircleKey} />
                    <NavLink url="#" title="Izin" icon={IconVersions} />
                    <NavLink url="#" title="Tetapkan Izin" icon={IconKeyframe} />
                    <NavLink url="#" title="Tetapkan Peran" icon={IconLayoutKanban} />
                    <NavLink url="#" title="Akses Rute" icon={IconRoute} />
                </div>
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Transaksi
                    <NavLink url="#" title="Peminjaman" icon={IconCreditCardPay} />
                    <NavLink url="#" title="Pengembalian" icon={IconCreditCardRefund} />
                </div>
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Lainnya
                    <NavLink url="#" title="Pengumuman" icon={IconAlertCircle} />
                    <NavLink url={route('profile.edit')} title="Profile" icon={IconUser} />
                    <NavLink
                        url={route('logout')}
                        title="Logout"
                        icon={IconLogout}
                        method="post"
                        as="button"
                        className="w-full"
                    />
                </div>
            </nav>
        </>
    );
};

export default Sidebar;

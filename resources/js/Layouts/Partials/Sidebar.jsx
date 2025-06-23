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
    const roles = auth?.role?.map((r) => r.toLowerCase()) ?? [];

    const hasAnyRole = (...allowedRoles) => roles.some((role) => allowedRoles.includes(role));

    return (
        <nav className="grid items-start px-2 text-sm font-semibold lg:px-4">
            {/* Dashboard (Admin, Operator, Member) */}
            {hasAnyRole('admin', 'operator', 'member') && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Dashboard
                    <NavLink
                        url={route('dashboard')}
                        title="Dashboard"
                        icon={IconDashboard}
                        active={url.startsWith('/dashboard')}
                    />
                </div>
            )}

            {/* Statistik (Admin only) */}
            {hasAnyRole('admin') && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Statistik
                    <NavLink
                        url={route('admin.loan-statistics.index')}
                        active={url.startsWith('/admin/loan-statistics')}
                        title="Statistik Peminjaman"
                        icon={IconChartDots2}
                    />
                    <NavLink
                        url={route('admin.fine-reports.index')}
                        active={url.startsWith('/admin/fine-reports')}
                        title="Laporan Denda"
                        icon={IconMoneybag}
                    />
                    <NavLink
                        url={route('admin.stock-book-reports.index')}
                        active={url.startsWith('/admin/stock-book-reports')}
                        title="Laporan Stok Buku"
                        icon={IconStack3}
                    />
                </div>
            )}

            {/* Master Data (Admin only) */}
            {hasAnyRole('admin', 'operator') && (
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
                    <NavLink
                        url={route('admin.users.index')}
                        active={url.startsWith('/admin/users')}
                        title="Pengguna"
                        icon={IconUsersGroup}
                    />
                    <NavLink
                        url={route('admin.fine-settings.create')}
                        active={url.startsWith('/admin/fine-settings')}
                        title="Pengaturan Denda"
                        icon={IconSettingsExclamation}
                    />
                </div>
            )}

            {/* Roles & Permissions (Admin only) */}
            {hasAnyRole('admin') && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Peran dan Izin
                    <NavLink
                        url={route('admin.roles.index')}
                        active={url.startsWith('/admin/roles')}
                        title="Peran"
                        icon={IconCircleKey}
                    />
                    <NavLink
                        url={route('admin.permissions.index')}
                        active={url.startsWith('/admin/permissions')}
                        title="Izin"
                        icon={IconVersions}
                    />
                    <NavLink
                        url={route('admin.assignement-permissions.index')}
                        active={url.startsWith('/admin/assignement-permissions')}
                        title="Tetapkan Izin"
                        icon={IconKeyframe}
                    />
                    <NavLink
                        url={route('admin.assign-users.index')}
                        active={url.startsWith('/admin/assign-users')}
                        title="Tetapkan Peran"
                        icon={IconLayoutKanban}
                    />
                    <NavLink
                        url={route('admin.route-accesses.index')}
                        active={url.startsWith('/admin/route-accesses')}
                        title="Akses Rute"
                        icon={IconRoute}
                    />
                </div>
            )}

            {/* Transaksi (Admin & Operator) */}
            {hasAnyRole('admin', 'operator') && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Transaksi
                    <NavLink
                        url={route('admin.loans.index')}
                        active={url.startsWith('/admin/loans')}
                        title="Peminjaman"
                        icon={IconCreditCardPay}
                    />
                    <NavLink
                        url={route('admin.return-books.index')}
                        active={url.startsWith('/admin/return-books')}
                        title="Pengembalian"
                        icon={IconCreditCardRefund}
                    />
                </div>
            )}

            {/* Lainnya (semua role) */}
            {hasAnyRole('admin', 'operator', 'member') && (
                <div className="px-3 py-2 text-sm font-semibold text-foreground">
                    Lainnya
                    {hasAnyRole('admin') && (
                        <NavLink
                            url={route('admin.announcements.index')}
                            active={url.startsWith('/admin/announcements')}
                            title="Pengumuman"
                            icon={IconAlertCircle}
                        />
                    )}
                    <NavLink
                        url={route('profile.edit')}
                        active={url.startsWith('/admin/profile')}
                        title="Profile"
                        icon={IconUser}
                    />
                </div>
            )}
        </nav>
    );
};

export default Sidebar;

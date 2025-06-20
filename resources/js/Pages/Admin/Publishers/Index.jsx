import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Table, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { IconBuildingCommunity, IconPlus } from "@tabler/icons-react";
import React from "react";

const Index = (props) => {
    return (
        <div className="flex flex-col pb-32 w-full">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="blue" size="lg" asChild>
                    <Link href={route("admin.categories.create")}>
                        <IconPlus size="4" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex flex-col w-full gap-4 lg:items-center lg:flex-row">
                        {/* search bar */}
                    </div>
                </CardHeader>
                <CardContent>
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead>Nomor Handphone</TableHead>
                                <TableHead>Logo</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

Index.layout = (page) => (
    <AppLayout children={page} title={page.props.page_setting.title} />
);
export default Index;

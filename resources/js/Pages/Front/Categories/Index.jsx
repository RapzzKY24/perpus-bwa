import CategoryCard from '@/Components/CategoryCard';
import HeaderTitle from '@/Components/HeaderTitle';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import AppLayout from '@/Layouts/AppLayout';
import { IconCategory } from '@tabler/icons-react';

const Index = (props) => {
    const { data: categories, meta } = props.categories;
    return (
        <div className="flex w-full flex-col space-y-6 pb-32">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_setting.title}
                    subtitle={props.page_setting.subtitle}
                    icon={IconCategory}
                />
            </div>
            <div className="box-content h-80 py-2">
                <div className="mb-24 flex flex-col gap-8 lg:grid lg:grid-cols-4">
                    {categories.map((category, index) => (
                        <CategoryCard item={category} key={index} />
                    ))}
                </div>
                {meta.has_pages && (
                    <Pagination>
                        <PaginationContent>
                            {meta.links.map((link, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink href={link.url} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

Index.layout = (page) => <AppLayout children={page} title={page.props.page_setting.title} />;
export default Index;

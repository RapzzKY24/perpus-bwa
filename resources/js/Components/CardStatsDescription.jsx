import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const CardStatsDescription = ({ title, description, children }) => {
    return (
        <Card>
            <CardHeader clasName="p-4 pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent clasName="flex flex-row items-baseline gap-4 p-4 pt-2">{children}</CardContent>
        </Card>
    );
};

export default CardStatsDescription;

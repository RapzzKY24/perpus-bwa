import { FINEPAYMENTSTATUS } from '@/lib/utils';
import { Badge } from './ui/badge';

const GetFineStatusBadge = ({ status }) => {
    const { SUCCESS, PENDING, FAILED } = FINEPAYMENTSTATUS;
    let badge, text;
    switch (status) {
        case PENDING:
            badge = 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 border-yellow-500';
            text = PENDING;
            break;
        case SUCCESS:
            badge = 'text-white bg-gradient-to-r from-green-400 via-green-500 to-yellow-500 border-green-500';
            text = SUCCESS;
            break;
        case FAILED:
            badge = 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500 border-red-500';
            text = FAILED;
            break;
        default:
            badge = '';
            text = '';
    }
    return <Badge className={badge}>{text}</Badge>;
};

export default GetFineStatusBadge;

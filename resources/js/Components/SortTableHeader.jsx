import { IconArrowsDownUp } from '@tabler/icons-react';
import { Button } from './ui/button';

const SortableHeader = ({ label, field, currentField, direction, onSort }) => (
    <Button variant="ghost" className="group inline-flex items-center gap-1 text-left" onClick={() => onSort(field)}>
        {label}
        <IconArrowsDownUp className={`size-4 text-muted-foreground ${currentField === field ? 'text-black' : ''}`} />
    </Button>
);

export default SortableHeader;

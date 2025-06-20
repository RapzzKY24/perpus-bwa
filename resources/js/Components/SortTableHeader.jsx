import React from "react";
import { Button } from "./ui/button";
import { IconArrowsDownUp } from "@tabler/icons-react";

const SortableHeader = ({ label, field, currentField, direction, onSort }) => (
    <Button
        variant="ghost"
        className="inline-flex group items-center gap-1 text-left"
        onClick={() => onSort(field)}
    >
        {label}
        <IconArrowsDownUp
            className={`size-4 text-muted-foreground ${
                currentField === field ? "text-black" : ""
            }`}
        />
    </Button>
);

export default SortableHeader;

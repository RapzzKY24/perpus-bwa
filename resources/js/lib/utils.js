import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const FINEPAYMENTSTATUS = {
    FAILED: "GAGAL",
    SUCCESS: "SUKSES",
    PENDING: "TERTUNDA",
};

const flashMessage = (params) => {
    return params.props.flash_message;
};

export const formatToRupiah = (amount) => {
    const formmater = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formmater.format(amount);
};

const message = {
    503: {
        title: "Service Unavailable",
        description:
            "Sorry , we are doing some maintenance.pleas take back soon",
        status: "503",
    },
    500: {
        title: "Server error",
        description: "Oops ,something went wrong on our servers",
        status: "500",
    },
    404: {
        title: "Not Found",
        description: "Sorry page you are looking not be found",
        status: "404",
    },
    403: {
        title: "Forbidden",
        description: "Sorry page you are forbidden from accessing this page",
        status: "403",
    },
    401: {
        title: "Unauthorzired",
        description: "Sorry page you are unauthorized access this page",
        status: "401",
    },
    429: {
        title: "To Many Resquest",
        description: "Please try again in just second",
        status: "429",
    },
    400: {
        title: "Bad Request",
        description: "Sorry , we are unable to process your request",
        status: "400",
    },
    422: {
        title: "Unprocessable Entity",
        description: "Sorry , we are unable to process your request",
        status: "422",
    },
    408: {
        title: "Request Timeout",
        description: "Sorry , we are unable to process your request",
        status: "408",
    },
    419: {
        title: "Page Expired",
        description: "Sorry , we are unable to process your request",
        status: "419",
    },
    419: {
        title: "Page Expired",
        description: "Sorry , we are unable to process your request",
        status: "419",
    },
};

export { flashMessage, message };

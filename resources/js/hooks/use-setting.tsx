import { Setting } from "@/types/setting";
import { usePage } from "@inertiajs/react";

export default function useSetting() {
    const { settings } = usePage<{settings:Setting}>().props;
    return {settings};
}

import { usePage } from '@inertiajs/react'


export default function useComapny() {
    const { company } = usePage().props as any;
    return {
        company
    }
}

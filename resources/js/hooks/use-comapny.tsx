import { usePage } from '@inertiajs/react'


export default function useComapny() {
    
    const { auth } = usePage().props as any;
    // return {
    //     company
    // }
      return {
        company: auth?.user?.company ?? null,
    };
}

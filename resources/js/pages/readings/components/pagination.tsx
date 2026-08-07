
import React from 'react'
import { Head, Link, router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}
export default function Pagination({
    links,
    currentPage,
    lastPage,
    total,
    from,
    to,
}: {
    links: PaginationLink[];
    currentPage: number;
    lastPage: number;
    total: number;
    from: number;
    to: number;
}) {
  const navigate = (url: string | null) => {
         if (!url) return;
         router.visit(url, { preserveScroll: true });
     };
 
     const pageLinks = links.filter((l) => l.page !== null);
     if (lastPage <= 1) return null;
 
 
    return (
     <div className="flex flex-col items-center gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-between dark:border-gray-800">
            <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-gray-900 dark:text-white">{from}–{to}</span> of{" "}
                <span className="font-medium text-gray-900 dark:text-white">{total}</span> sessions
            </p>

            <div className="flex items-center gap-1">
                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    disabled={currentPage === 1}
                    onClick={() =>
                        navigate(links.find((l) => l.label.includes("Previous"))?.url ?? null)
                    }
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pageLinks.map((link) => (
                    <Button
                        key={link.page}
                        size="sm"
                        variant={link.active ? "default" : "outline"}
                        className="h-8 min-w-[2rem] px-2 text-xs"
                        onClick={() => navigate(link.url)}
                    >
                        {link.page}
                    </Button>
                ))}

                <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    disabled={currentPage === lastPage}
                    onClick={() =>
                        navigate(links.find((l) => l.label.includes("Next"))?.url ?? null)
                    }
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
  )
}

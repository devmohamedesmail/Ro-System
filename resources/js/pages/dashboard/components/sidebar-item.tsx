import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";


export default function SidebarItem({
    item,
    active,
    isCollapsed,
    isMobile,
    onClose
}: any) {

    const Icon = item.icon;


    return (

        <li className="flex justify-between items-center">

            <Link
                href={item.href}
                onClick={isMobile ? onClose : undefined}
                className={cn(
                    "group w-full relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",

                    active
                        ? "bg-white/20 text-white"
                        : "text-white hover:bg-white/10",

                    isCollapsed && !isMobile && "justify-center px-2"
                )}
            >

                <Icon className="h-5 w-5 shrink-0" />


                {(!isCollapsed || isMobile) && (

                    <span className="truncate">
                        {item.label}
                    </span>

                )}

            </Link>
            <ChevronLeft className="text-white text-xs" size={18} />
        </li>

    )
}
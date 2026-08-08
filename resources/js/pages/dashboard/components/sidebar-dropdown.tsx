import { Link } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SidebarDropdown({
    item,
    isCollapsed,
    isMobile,
    onClose,
    isActive
}: any) {

    const [open, setOpen] = useState(false);

    const Icon = item.icon;

    const hasActiveChild = item.children?.some(
        (child:any)=> isActive(child.href)
    );


    return (
        <li>

            <button
                onClick={()=>setOpen(!open)}
                className={cn(
                    "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    "text-white hover:bg-white/10",
                    isCollapsed && !isMobile && "justify-center px-2",
                    hasActiveChild && "bg-white/10"
                )}
            >

                <Icon className="h-5 w-5 shrink-0"/>


                {(!isCollapsed || isMobile) && (
                    <>
                        <span className="flex-1 text-right">
                            {item.label}
                        </span>


                        <ChevronDown
                            className={cn(
                                "h-4 w-4 transition-transform",
                                open && "rotate-180"
                            )}
                        />
                    </>
                )}

            </button>


            {open && (!isCollapsed || isMobile) && (

                <ul className="mt-1 space-y-1">

                    {
                        item.children.map((child:any)=>{

                            const ChildIcon = child.icon;

                            const active = isActive(child.href);


                            return (
                                <li key={child.key}>

                                    <Link
                                        href={child.href}
                                        onClick={isMobile ? onClose : undefined}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-8 py-2 text-sm transition",
                                            active
                                            ? "bg-white/20 text-white"
                                            : "text-white/80 hover:bg-white/10 hover:text-white"
                                        )}
                                    >

                                        <ChildIcon className="h-4 w-4"/>

                                        <span>
                                            {child.label}
                                        </span>

                                    </Link>

                                </li>
                            )

                        })
                    }

                </ul>

            )}

        </li>
    )
}
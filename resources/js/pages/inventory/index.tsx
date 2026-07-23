import React from 'react'
import { DashboardLayout } from '../dashboard/components/layout/DashboardLayout'
import InventoryFormDialog from './components/InventoryFormDialog'
import useImport from '@/hooks/use-import';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus,Package } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function InventoryPage({stations}:any) {
    const { t } = useImport();
    const [createOpen, setCreateOpen] = useState(false);


    console.log("stations",stations)
    return (
    <DashboardLayout>
          <Head title={t("inventory.title")} />

            <div className="space-y-6 p-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Package className="h-8 w-8 text-violet-600" />

                        <div>

                            <h1 className="text-2xl font-bold">
                                {t("inventory.title")}
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                {t("inventory.subtitle")}
                            </p>

                        </div>

                    </div>

                    <Button
                        onClick={() => setCreateOpen(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        {t("inventory.create")}
                    </Button>

                </div>

                {/* InventoryTable will go here */}

            </div>

            <InventoryFormDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                stations={stations}
                inventory={null}
            />
    </DashboardLayout>
  )
}

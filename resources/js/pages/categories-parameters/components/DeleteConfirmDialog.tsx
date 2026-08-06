import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void;
    loading?: boolean;
}

export function DeleteConfirmDialog({
    open,
    onClose,
    title,
    message,
    onConfirm,
    loading = false,
}: DeleteConfirmDialogProps) {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader className="flex flex-col items-center text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {message}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4 flex flex-row items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                        {t('common.cancel')}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {loading ? t('common.loading') : t('common.delete')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

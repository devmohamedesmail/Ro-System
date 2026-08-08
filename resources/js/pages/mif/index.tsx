import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';
import {
    ArrowRight,
    ArrowUpRight,
    Box,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    FileSpreadsheet,
    FileText,
    Layers,
    MapPin,
    Package,
    Plus,
    Search,
    Trash2,
    UserCheck,
    UserCheck2,
    Wrench,
} from 'lucide-react';

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface InventoryItem {
    id: number;
    inventory_id: number;
    name: string;
    code?: string | null;
    type: string;
    unit: string;
    quantity: number;
    minimum_quantity: number;
}

interface Inventory {
    id: number;
    station_id: number;
    name: string;
    items?: InventoryItem[];
}

interface Station {
    id: number;
    name: string;
    code?: string | null;
    inventory?: Inventory | null;
}

interface UserOption {
    id: number;
    name: string;
    email: string;
}

interface MaterialIssuingItemData {
    id?: number;
    serial_number?: number;
    item_code?: string | null;
    valuation_type?: string | null;
    material_description?: string | null;
    pm_order?: string | null;
    unit?: string | null;
    balance: number;
    quantity: number;
    balance_after: number;
    station?: Station | null;
}

interface MaterialIssuingForm {
    id: number;
    form_number: string;
    from_location?: string | null;
    store_location?: string | null;
    from_date?: string | null;
    to_date?: string | null;
    is_transfer: boolean;
    is_maintenance_direct_issue: boolean;
    remarks?: string | null;
    issuedBy?: UserOption | null;
    recievedBy?: UserOption | null;
    items: MaterialIssuingItemData[];
    created_at?: string;
}

interface IndexProps {
    stations: Station[];
    forms: MaterialIssuingForm[];
    users: UserOption[];
}

interface FormLineItem {
    inventory_item_id: string;
    item_code: string;
    material_description: string;
    unit: string;
    balance: number;
    quantity: number;
    balance_after: number;
    pm_order: string;
    valuation_type: string;
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function MIFPage({ stations = [], forms = [], users = [] }: IndexProps) {
    const { t } = useTranslation();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Compute Metrics
    const totalFormsCount = forms.length;
    const totalItemsIssued = forms.reduce((sum, f) => sum + (f.items?.length || 0), 0);
    const totalMaintenanceCount = forms.filter((f) => f.is_maintenance_direct_issue).length;
    const totalTransfersCount = forms.filter((f) => f.is_transfer).length;

    // Filter Forms
    const filteredForms = forms.filter((form) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            form.form_number.toLowerCase().includes(q) ||
            form.from_location?.toLowerCase().includes(q) ||
            form.store_location?.toLowerCase().includes(q) ||
            form.remarks?.toLowerCase().includes(q) ||
            form.issuedBy?.name.toLowerCase().includes(q) ||
            form.recievedBy?.name.toLowerCase().includes(q) ||
            form.items.some(
                (item) =>
                    item.material_description?.toLowerCase().includes(q) ||
                    item.item_code?.toLowerCase().includes(q)
            )
        );
    });

    return (
        <DashboardLayout>
            <Head title={`${t('inventory.mifSection.title')} — AquaRO`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header Banner */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <FileSpreadsheet className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                            {t('inventory.mifSection.title')}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t('inventory.mifSection.subtitle')}
                        </p>
                    </div>

                    <Button
                        onClick={() => setCreateDialogOpen(true)}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 font-bold"
                    >
                        <Plus className="h-4 w-4" />
                        {t('inventory.mifSection.create')}
                    </Button>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                                <FileSpreadsheet className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Total MIF Forms
                                </p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                    {totalFormsCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Items Issued
                                </p>
                                <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                                    {totalItemsIssued}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                <Wrench className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Maintenance Direct
                                </p>
                                <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                                    {totalMaintenanceCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                                <ArrowUpRight className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Transfers
                                </p>
                                <p className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                                    {totalTransfersCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search Bar */}
                <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 rtl:right-3 rtl:left-auto" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('common.search') || 'Search MIF forms, numbers, materials, users...'}
                                className="pl-9 rtl:pr-9 rtl:pl-3"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Forms List Container */}
                {filteredForms.length === 0 ? (
                    <Card className="border-gray-200 p-12 text-center shadow-sm dark:border-gray-800">
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                                <FileSpreadsheet className="h-8 w-8" />
                            </div>
                            <div className="max-w-sm space-y-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {t('inventory.mifSection.noForms')}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('inventory.mifSection.subtitle')}
                                </p>
                            </div>
                            <Button
                                onClick={() => setCreateDialogOpen(true)}
                                className="bg-teal-600 hover:bg-teal-700 font-bold"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                {t('inventory.mifSection.create')}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {filteredForms.map((form, idx) => (
                            <MIFFormCard key={form.id} form={form} defaultExpanded={idx === 0} />
                        ))}
                    </div>
                )}
            </div>

            {/* Create MIF Dialog */}
            <CreateMIFDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                stations={stations}
                users={users}
            />
        </DashboardLayout>
    );
}

// ─── MIF Form Card Component ──────────────────────────────────────────────────

function MIFFormCard({ form, defaultExpanded = false }: { form: MaterialIssuingForm; defaultExpanded?: boolean }) {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(defaultExpanded);

    const items = form.items || [];

    return (
        <Card className="overflow-hidden border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            {/* Header Accordion Bar */}
            <div
                onClick={() => setExpanded((v) => !v)}
                className="flex cursor-pointer flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between bg-gray-50/60 hover:bg-gray-100/60 dark:bg-gray-900/60 dark:hover:bg-gray-800/40 transition border-b border-gray-100 dark:border-gray-800"
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 font-extrabold font-mono">
                        #{form.form_number}
                    </div>

                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-gray-900 dark:text-white">
                                {form.form_number}
                            </h3>
                            {form.is_transfer && (
                                <Badge className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300">
                                    {t('inventory.mifSection.isTransfer')}
                                </Badge>
                            )}
                            {form.is_maintenance_direct_issue && (
                                <Badge className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300">
                                    {t('inventory.mifSection.isMaintenanceDirectIssue')}
                                </Badge>
                            )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            {form.from_location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                    {form.from_location} {form.store_location ? `→ ${form.store_location}` : ''}
                                </span>
                            )}
                            {form.from_date && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                    {form.from_date}
                                </span>
                            )}
                            {form.issuedBy && (
                                <span className="flex items-center gap-1">
                                    <UserCheck className="h-3.5 w-3.5 text-teal-500" />
                                    {t('inventory.mifSection.issuedBy')}: <strong>{form.issuedBy.name}</strong>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Badge variant="outline" className="gap-1 font-semibold text-xs border-teal-200 text-teal-700 dark:border-teal-900 dark:text-teal-300">
                        <Package className="h-3.5 w-3.5" />
                        {items.length} {t('inventory.mifSection.items')}
                    </Badge>

                    {expanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                </div>
            </div>

            {/* Expandable Body */}
            {expanded && (
                <CardContent className="space-y-6 p-6">
                    {/* Form Metadata Box */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs bg-gray-50/50 p-4 rounded-xl dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                        <div>
                            <span className="block font-medium text-gray-400">{t('inventory.mifSection.issuedBy')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block">
                                {form.issuedBy ? form.issuedBy.name : '—'}
                            </span>
                        </div>

                        <div>
                            <span className="block font-medium text-gray-400">{t('inventory.mifSection.recievedBy')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block">
                                {form.recievedBy ? form.recievedBy.name : '—'}
                            </span>
                        </div>

                        <div>
                            <span className="block font-medium text-gray-400">{t('inventory.mifSection.remarks')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block italic">
                                {form.remarks || '—'}
                            </span>
                        </div>
                    </div>

                    {/* Issued Material Items Table */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <Layers className="h-4 w-4 text-teal-600" />
                            {t('inventory.mifSection.items')}
                        </h4>

                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                            <table className="w-full text-left text-sm rtl:text-right">
                                <thead>
                                    <tr className="bg-gray-100/70 dark:bg-gray-800 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200 dark:border-gray-800">
                                        <th className="p-3">#</th>
                                        <th className="p-3">{t('inventory.mifSection.itemCode')}</th>
                                        <th className="p-3">{t('inventory.mifSection.materialDescription')}</th>
                                        <th className="p-3">{t('inventory.mifSection.pmOrder')}</th>
                                        <th className="p-3 text-center">{t('inventory.mifSection.balance')}</th>
                                        <th className="p-3 text-center text-teal-600 dark:text-teal-400">{t('inventory.mifSection.quantity')}</th>
                                        <th className="p-3 text-center">{t('inventory.mifSection.balanceAfter')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                                            <td className="p-3 font-mono text-xs text-gray-400">#{item.serial_number || idx + 1}</td>
                                            <td className="p-3 font-mono font-bold text-gray-900 dark:text-white">
                                                {item.item_code || '—'}
                                            </td>
                                            <td className="p-3">
                                                <div className="font-semibold text-gray-900 dark:text-white">
                                                    {item.material_description}
                                                </div>
                                                {item.station && (
                                                    <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                                        <Building2 className="h-3 w-3" />
                                                        {item.station.name}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3 font-mono text-xs text-gray-600 dark:text-gray-300">
                                                {item.pm_order || '—'}
                                            </td>
                                            <td className="p-3 text-center font-mono text-gray-500">
                                                {item.balance} <span className="text-xs font-normal">{item.unit}</span>
                                            </td>
                                            <td className="p-3 text-center font-mono font-bold text-teal-600 dark:text-teal-400">
                                                -{item.quantity} <span className="text-xs font-normal">{item.unit}</span>
                                            </td>
                                            <td className="p-3 text-center font-mono font-semibold text-gray-800 dark:text-gray-200">
                                                {item.balance_after} <span className="text-xs font-normal">{item.unit}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

// ─── Create MIF Modal Dialog ──────────────────────────────────────────────────

interface CreateMIFDialogProps {
    open: boolean;
    onClose: () => void;
    stations: Station[];
    users: UserOption[];
}

function CreateMIFDialog({ open, onClose, stations = [], users = [] }: CreateMIFDialogProps) {
    const { t } = useTranslation();

    // Form header state
    const [formNumber, setFormNumber] = useState('');
    const [stationId, setStationId] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [storeLocation, setStoreLocation] = useState('');
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [isTransfer, setIsTransfer] = useState(false);
    const [isMaintenanceDirectIssue, setIsMaintenanceDirectIssue] = useState(true);
    const [issuedBy, setIssuedBy] = useState('');
    const [recievedBy, setRecievedBy] = useState('');
    const [remarks, setRemarks] = useState('');

    // Form line items
    const [lineItems, setLineItems] = useState<FormLineItem[]>([
        {
            inventory_item_id: '',
            item_code: '',
            material_description: '',
            unit: '',
            balance: 0,
            quantity: 1,
            balance_after: 0,
            pm_order: '',
            valuation_type: '',
        },
    ]);

    const [submitting, setSubmitting] = useState(false);

    // Derived inventory items for the selected station
    const selectedStation = stations.find((s) => s.id.toString() === stationId);
    const stationInventoryItems = selectedStation?.inventory?.items || [];

    // Handlers for adding/removing line items
    const handleAddLineItem = () => {
        setLineItems([
            ...lineItems,
            {
                inventory_item_id: '',
                item_code: '',
                material_description: '',
                unit: '',
                balance: 0,
                quantity: 1,
                balance_after: 0,
                pm_order: '',
                valuation_type: '',
            },
        ]);
    };

    const handleRemoveLineItem = (index: number) => {
        setLineItems(lineItems.filter((_, i) => i !== index));
    };

    const handleSelectItem = (index: number, itemIdStr: string) => {
        const item = stationInventoryItems.find((inv) => inv.id.toString() === itemIdStr);
        if (!item) return;

        const updated = [...lineItems];
        const qty = updated[index].quantity || 1;
        const currentBalance = item.quantity || 0;

        updated[index] = {
            ...updated[index],
            inventory_item_id: itemIdStr,
            item_code: item.code || '',
            material_description: item.name,
            unit: item.unit || 'piece',
            balance: currentBalance,
            quantity: qty,
            balance_after: Math.max(0, currentBalance - qty),
        };

        setLineItems(updated);
    };

    const handleQuantityChange = (index: number, qtyVal: string) => {
        const qty = parseFloat(qtyVal) || 0;
        const updated = [...lineItems];
        const currentBalance = updated[index].balance || 0;

        updated[index] = {
            ...updated[index],
            quantity: qty,
            balance_after: Math.max(0, currentBalance - qty),
        };

        setLineItems(updated);
    };

    const handleFieldChange = (index: number, field: keyof FormLineItem, value: string) => {
        const updated = [...lineItems];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        setLineItems(updated);
    };

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!stationId) {
            toast.error(t('validation.required') || 'Please select station');
            return;
        }

        const validItems = lineItems.filter((li) => li.inventory_item_id && li.quantity > 0);
        if (validItems.length === 0) {
            toast.error(t('inventory.mifSection.noItems') || 'Please add at least one material item');
            return;
        }

        setSubmitting(true);

        const payload = {
            form_number: formNumber || undefined,
            station_id: stationId,
            from_location: fromLocation || undefined,
            store_location: storeLocation || undefined,
            from_date: fromDate,
            to_date: toDate,
            is_transfer: isTransfer,
            is_maintenance_direct_issue: isMaintenanceDirectIssue,
            issued_by: issuedBy || undefined,
            recieved_by: recievedBy || undefined,
            remarks: remarks || undefined,
            items: validItems.map((li) => ({
                inventory_item_id: Number(li.inventory_item_id),
                station_id: Number(stationId),
                quantity: li.quantity,
                pm_order: li.pm_order || undefined,
                valuation_type: li.valuation_type || undefined,
            })),
        };

        router.post('/mif', payload, {
            onSuccess: () => {
                toast.success(t('inventory.mifSection.createdSuccess'));
                onClose();
            },
            onError: (err) => {
                console.error(err);
                toast.error(t('common.error'));
            },
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <FileSpreadsheet className="h-6 w-6 text-teal-600" />
                        {t('inventory.mifSection.create')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('inventory.mifSection.subtitle')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                    {/* Header Controls Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* Station Select */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <Label htmlFor="station_id" className="text-sm font-medium">
                                {t('inventory.mifSection.station')} <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={stationId}
                                onValueChange={(val) => {
                                    setStationId(val);
                                    // Reset line items when station changes
                                    setLineItems([
                                        {
                                            inventory_item_id: '',
                                            item_code: '',
                                            material_description: '',
                                            unit: '',
                                            balance: 0,
                                            quantity: 1,
                                            balance_after: 0,
                                            pm_order: '',
                                            valuation_type: '',
                                        },
                                    ]);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('inventory.mifSection.selectStation')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {stations.map((st) => (
                                        <SelectItem key={st.id} value={st.id.toString()}>
                                            {st.name} ({st.code}) &mdash; {st.inventory?.items?.length || 0} Stock Items
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Form Number */}
                        <div className="space-y-1.5">
                            <Label htmlFor="form_number" className="text-sm font-medium">
                                {t('inventory.mifSection.formNumber')}
                            </Label>
                            <Input
                                id="form_number"
                                value={formNumber}
                                onChange={(e) => setFormNumber(e.target.value)}
                                placeholder={t('inventory.mifSection.formNumberPlaceholder')}
                            />
                        </div>

                        {/* From Location */}
                        <div className="space-y-1.5">
                            <Label htmlFor="from_location" className="text-sm font-medium">
                                {t('inventory.mifSection.fromLocation')}
                            </Label>
                            <Input
                                id="from_location"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                                placeholder="Main Warehouse"
                            />
                        </div>

                        {/* Store Location */}
                        <div className="space-y-1.5">
                            <Label htmlFor="store_location" className="text-sm font-medium">
                                {t('inventory.mifSection.storeLocation')}
                            </Label>
                            <Input
                                id="store_location"
                                value={storeLocation}
                                onChange={(e) => setStoreLocation(e.target.value)}
                                placeholder="Station Store A"
                            />
                        </div>

                        {/* Issued By */}
                        <div className="space-y-1.5">
                            <Label htmlFor="issued_by" className="text-sm font-medium">
                                {t('inventory.mifSection.issuedBy')}
                            </Label>
                            <Select value={issuedBy} onValueChange={setIssuedBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('inventory.mifSection.issuedBy')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((u) => (
                                        <SelectItem key={u.id} value={u.id.toString()}>
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Dates */}
                        <div className="space-y-1.5">
                            <Label htmlFor="from_date" className="text-sm font-medium">
                                {t('inventory.mifSection.fromDate')}
                            </Label>
                            <Input
                                id="from_date"
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="to_date" className="text-sm font-medium">
                                {t('inventory.mifSection.toDate')}
                            </Label>
                            <Input
                                id="to_date"
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                            />
                        </div>

                        {/* Received By */}
                        <div className="space-y-1.5">
                            <Label htmlFor="recieved_by" className="text-sm font-medium">
                                {t('inventory.mifSection.recievedBy')}
                            </Label>
                            <Select value={recievedBy} onValueChange={setRecievedBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('inventory.mifSection.recievedBy')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((u) => (
                                        <SelectItem key={u.id} value={u.id.toString()}>
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_maintenance_direct_issue"
                                checked={isMaintenanceDirectIssue}
                                onCheckedChange={(c) => setIsMaintenanceDirectIssue(Boolean(c))}
                            />
                            <Label htmlFor="is_maintenance_direct_issue" className="cursor-pointer text-sm font-medium">
                                {t('inventory.mifSection.isMaintenanceDirectIssue')}
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="is_transfer"
                                checked={isTransfer}
                                onCheckedChange={(c) => setIsTransfer(Boolean(c))}
                            />
                            <Label htmlFor="is_transfer" className="cursor-pointer text-sm font-medium">
                                {t('inventory.mifSection.isTransfer')}
                            </Label>
                        </div>
                    </div>

                    {/* Remarks */}
                    <div className="space-y-1.5">
                        <Label htmlFor="remarks" className="text-sm font-medium">
                            {t('inventory.mifSection.remarks')}
                        </Label>
                        <Textarea
                            id="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows={2}
                            placeholder="Operational notes, PM order references..."
                        />
                    </div>

                    {/* Dynamic Material Items Table */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <Package className="h-4 w-4 text-teal-600" />
                                {t('inventory.mifSection.items')}
                            </h4>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={handleAddLineItem}
                                disabled={!stationId}
                                className="flex items-center gap-1.5 text-teal-600 border-teal-200 hover:bg-teal-50"
                            >
                                <Plus className="h-4 w-4" />
                                {t('inventory.mifSection.addItem')}
                            </Button>
                        </div>

                        {!stationId ? (
                            <div className="p-6 text-center border border-dashed rounded-xl text-sm text-gray-400">
                                {t('inventory.mifSection.selectStation')} to view available inventory stock.
                            </div>
                        ) : stationInventoryItems.length === 0 ? (
                            <div className="p-6 text-center border border-dashed rounded-xl text-sm text-amber-600 bg-amber-50/50">
                                No stock items registered in this station's inventory yet.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {lineItems.map((li, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50 space-y-3"
                                    >
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                                            <span>Material Item #{idx + 1}</span>
                                            {lineItems.length > 1 && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleRemoveLineItem(idx)}
                                                    className="h-7 w-7 p-0 text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                            {/* Select Item */}
                                            <div className="sm:col-span-2 space-y-1">
                                                <Label className="text-xs">{t('inventory.mifSection.selectInventoryItem')}</Label>
                                                <Select
                                                    value={li.inventory_item_id}
                                                    onValueChange={(val) => handleSelectItem(idx, val)}
                                                >
                                                    <SelectTrigger className="h-9 text-xs">
                                                        <SelectValue placeholder={t('inventory.mifSection.selectInventoryItem')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {stationInventoryItems.map((inv) => (
                                                            <SelectItem key={inv.id} value={inv.id.toString()}>
                                                                {inv.name} ({inv.code || 'No Code'}) &mdash; Stock: {inv.quantity} {inv.unit}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* PM Order */}
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t('inventory.mifSection.pmOrder')}</Label>
                                                <Input
                                                    className="h-9 text-xs"
                                                    value={li.pm_order}
                                                    onChange={(e) => handleFieldChange(idx, 'pm_order', e.target.value)}
                                                    placeholder="PM-10293"
                                                />
                                            </div>

                                            {/* Valuation Type */}
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t('inventory.mifSection.valuationType')}</Label>
                                                <Input
                                                    className="h-9 text-xs"
                                                    value={li.valuation_type}
                                                    onChange={(e) => handleFieldChange(idx, 'valuation_type', e.target.value)}
                                                    placeholder="Standard / Spare"
                                                />
                                            </div>
                                        </div>

                                        {/* Stock & Quantity row */}
                                        {li.inventory_item_id && (
                                            <div className="grid grid-cols-3 gap-3 pt-1 border-t border-gray-200/60 dark:border-gray-800 text-xs">
                                                <div className="bg-white p-2.5 rounded-lg border dark:bg-gray-900">
                                                    <span className="text-gray-400 block">{t('inventory.mifSection.balance')}</span>
                                                    <span className="font-bold text-gray-900 dark:text-white font-mono">
                                                        {li.balance} {li.unit}
                                                    </span>
                                                </div>

                                                <div className="bg-white p-2.5 rounded-lg border dark:bg-gray-900">
                                                    <Label className="text-teal-600 font-bold block mb-1">
                                                        {t('inventory.mifSection.quantity')}
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        step="0.001"
                                                        min="0.001"
                                                        max={li.balance}
                                                        className="h-7 font-mono font-bold text-teal-600"
                                                        value={li.quantity}
                                                        onChange={(e) => handleQuantityChange(idx, e.target.value)}
                                                    />
                                                </div>

                                                <div className="bg-white p-2.5 rounded-lg border dark:bg-gray-900">
                                                    <span className="text-gray-400 block">{t('inventory.mifSection.balanceAfter')}</span>
                                                    <span className="font-bold text-gray-900 dark:text-white font-mono">
                                                        {li.balance_after} {li.unit}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <DialogFooter className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Button type="button" variant="outline" onClick={onClose}>
                            {t('common.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            disabled={submitting}
                            className="bg-teal-600 hover:bg-teal-700 font-bold"
                        >
                            {submitting ? t('common.loading') : t('inventory.mifSection.submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
    ArrowDownLeft,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    FileCheck2,
    FileText,
    Inbox,
    Layers,
    MapPin,
    PackageCheck,
    Plus,
    Search,
    Trash2,
    UserCheck,
    Users,
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

interface MaterialReceivingItemData {
    id?: number;
    serial_number?: number;
    item_code?: string | null;
    material_description?: string | null;
    part_serial_number?: string | null;
    valuation_type?: string | null;
    bin_location?: string | null;
    unit?: string | null;
    quantity: number;
    sto_pro_no?: string | null;
    invoice_no?: string | null;
}

interface MaterialReceivingForm {
    id: number;
    form_number: string;
    location?: string | null;
    from_plant?: string | null;
    store_location?: string | null;
    from_date?: string | null;
    to_date?: string | null;
    remarks?: string | null;
    operator?: string | null;
    area_supervisor?: string | null;
    department?: string | null;
    department_head?: string | null;
    receivedBy?: UserOption | null;
    reviewedBy?: UserOption | null;
    requestedBy?: UserOption | null;
    approvedBy?: UserOption | null;
    items: MaterialReceivingItemData[];
    created_at?: string;
}

interface IndexProps {
    stations: Station[];
    forms: MaterialReceivingForm[];
    users: UserOption[];
}

interface FormLineItem {
    inventory_item_id: string;
    item_code: string;
    material_description: string;
    unit: string;
    current_stock: number;
    quantity: number;
    part_serial_number: string;
    valuation_type: string;
    bin_location: string;
    sto_pro_no: string;
    invoice_no: string;
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function MRFPage({ stations = [], forms = [], users = [] }: IndexProps) {
    const { t } = useTranslation();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Compute Metrics
    const totalFormsCount = forms.length;
    const totalItemsReceived = forms.reduce((sum, f) => sum + (f.items?.length || 0), 0);
    const totalQuantity = forms.reduce(
        (sum, f) => sum + f.items.reduce((iSum, i) => iSum + (i.quantity || 0), 0),
        0
    );

    // Filter Forms
    const filteredForms = forms.filter((form) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            form.form_number.toLowerCase().includes(q) ||
            form.location?.toLowerCase().includes(q) ||
            form.from_plant?.toLowerCase().includes(q) ||
            form.store_location?.toLowerCase().includes(q) ||
            form.remarks?.toLowerCase().includes(q) ||
            form.receivedBy?.name.toLowerCase().includes(q) ||
            form.approvedBy?.name.toLowerCase().includes(q) ||
            form.items.some(
                (item) =>
                    item.material_description?.toLowerCase().includes(q) ||
                    item.item_code?.toLowerCase().includes(q)
            )
        );
    });

    return (
        <DashboardLayout>
            <Head title={`${t('inventory.mrfSection.title')} — AquaRO`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header Banner */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <PackageCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                            {t('inventory.mrfSection.title')}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t('inventory.mrfSection.subtitle')}
                        </p>
                    </div>

                    <Button
                        onClick={() => setCreateDialogOpen(true)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 font-bold"
                    >
                        <Plus className="h-4 w-4" />
                        {t('inventory.mrfSection.create')}
                    </Button>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <FileCheck2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Total MRF Forms
                                </p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                    {totalFormsCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                                <Inbox className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Materials Received
                                </p>
                                <p className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">
                                    {totalItemsReceived}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <ArrowDownLeft className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Total Quantity Added
                                </p>
                                <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                                    +{totalQuantity.toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Active Stations
                                </p>
                                <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                    {stations.length}
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
                                placeholder={t('common.search') || 'Search MRF forms, suppliers, items, users...'}
                                className="pl-9 rtl:pr-9 rtl:pl-3"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Forms List Container */}
                {filteredForms.length === 0 ? (
                    <Card className="border-gray-200 p-12 text-center shadow-sm dark:border-gray-800">
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <PackageCheck className="h-8 w-8" />
                            </div>
                            <div className="max-w-sm space-y-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {t('inventory.mrfSection.noForms')}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('inventory.mrfSection.subtitle')}
                                </p>
                            </div>
                            <Button
                                onClick={() => setCreateDialogOpen(true)}
                                className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                {t('inventory.mrfSection.create')}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {filteredForms.map((form, idx) => (
                            <MRFFormCard key={form.id} form={form} defaultExpanded={idx === 0} />
                        ))}
                    </div>
                )}
            </div>

            {/* Create MRF Dialog */}
            <CreateMRFDialog
                open={createDialogOpen}
                onClose={() => setCreateDialogOpen(false)}
                stations={stations}
                users={users}
            />
        </DashboardLayout>
    );
}

// ─── MRF Form Card Component ──────────────────────────────────────────────────

function MRFFormCard({ form, defaultExpanded = false }: { form: MaterialReceivingForm; defaultExpanded?: boolean }) {
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
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold font-mono">
                        #{form.form_number}
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                            {form.form_number}
                        </h3>

                        <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            {form.from_plant && (
                                <span className="flex items-center gap-1">
                                    <Building2 className="h-3.5 w-3.5 text-gray-400" />
                                    {t('inventory.mrfSection.fromPlant')}: <strong>{form.from_plant}</strong>
                                </span>
                            )}
                            {form.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                    {form.location}
                                </span>
                            )}
                            {form.from_date && (
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                    {form.from_date}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Badge variant="outline" className="gap-1 font-semibold text-xs border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-300">
                        <Inbox className="h-3.5 w-3.5" />
                        {items.length} {t('inventory.mrfSection.items')}
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
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-xs bg-gray-50/50 p-4 rounded-xl dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                        <div>
                            <span className="block font-medium text-gray-400">{t('inventory.mrfSection.receivedBy')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block flex items-center gap-1">
                                <UserCheck className="h-3.5 w-3.5 text-emerald-500" />
                                {form.receivedBy ? form.receivedBy.name : '—'}
                            </span>
                        </div>

                        <div>
                            <span className="block font-medium text-gray-400">{t('inventory.mrfSection.approvedBy')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                                {form.approvedBy ? form.approvedBy.name : '—'}
                            </span>
                        </div>

                        <div>
                            <span className="block font-medium text-gray-400">{t('inventory.mrfSection.reviewedBy')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block">
                                {form.reviewedBy ? form.reviewedBy.name : '—'}
                            </span>
                        </div>

                        <div>
                            <span className="block font-medium text-gray-400">{t('inventory.mrfSection.remarks')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 mt-0.5 block italic truncate">
                                {form.remarks || '—'}
                            </span>
                        </div>
                    </div>

                    {/* Received Items Table */}
                    <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                            <Layers className="h-4 w-4 text-emerald-600" />
                            {t('inventory.mrfSection.items')}
                        </h4>

                        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                            <table className="w-full text-left text-sm rtl:text-right">
                                <thead>
                                    <tr className="bg-gray-100/70 dark:bg-gray-800 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200 dark:border-gray-800">
                                        <th className="p-3">#</th>
                                        <th className="p-3">{t('inventory.mrfSection.itemCode')}</th>
                                        <th className="p-3">{t('inventory.mrfSection.materialDescription')}</th>
                                        <th className="p-3">{t('inventory.mrfSection.partSerialNumber')}</th>
                                        <th className="p-3 text-center text-emerald-600 dark:text-emerald-400">{t('inventory.mrfSection.quantityReceived')}</th>
                                        <th className="p-3">{t('inventory.mrfSection.binLocation')}</th>
                                        <th className="p-3">{t('inventory.mrfSection.invoiceNo')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition">
                                            <td className="p-3 font-mono text-xs text-gray-400">#{item.serial_number || idx + 1}</td>
                                            <td className="p-3 font-mono font-bold text-gray-900 dark:text-white">
                                                {item.item_code || '—'}
                                            </td>
                                            <td className="p-3 font-semibold text-gray-900 dark:text-white">
                                                {item.material_description}
                                            </td>
                                            <td className="p-3 font-mono text-xs text-gray-600 dark:text-gray-300">
                                                {item.part_serial_number || '—'}
                                            </td>
                                            <td className="p-3 text-center font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                                                +{item.quantity} <span className="text-xs font-normal">{item.unit}</span>
                                            </td>
                                            <td className="p-3 font-mono text-xs text-gray-600 dark:text-gray-300">
                                                {item.bin_location || '—'}
                                            </td>
                                            <td className="p-3 font-mono text-xs text-gray-600 dark:text-gray-300">
                                                {item.invoice_no || item.sto_pro_no || '—'}
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

// ─── Create MRF Modal Dialog ──────────────────────────────────────────────────

interface CreateMRFDialogProps {
    open: boolean;
    onClose: () => void;
    stations: Station[];
    users: UserOption[];
}

function CreateMRFDialog({ open, onClose, stations = [], users = [] }: CreateMRFDialogProps) {
    const { t } = useTranslation();

    // Form header state
    const [formNumber, setFormNumber] = useState('');
    const [stationId, setStationId] = useState('');
    const [location, setLocation] = useState('');
    const [fromPlant, setFromPlant] = useState('');
    const [storeLocation, setStoreLocation] = useState('');
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
    const [receivedBy, setReceivedBy] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [reviewedBy, setReviewedBy] = useState('');
    const [requestedBy, setRequestedBy] = useState('');
    const [remarks, setRemarks] = useState('');

    // Form line items
    const [lineItems, setLineItems] = useState<FormLineItem[]>([
        {
            inventory_item_id: '',
            item_code: '',
            material_description: '',
            unit: '',
            current_stock: 0,
            quantity: 1,
            part_serial_number: '',
            valuation_type: '',
            bin_location: '',
            sto_pro_no: '',
            invoice_no: '',
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
                current_stock: 0,
                quantity: 1,
                part_serial_number: '',
                valuation_type: '',
                bin_location: '',
                sto_pro_no: '',
                invoice_no: '',
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
        updated[index] = {
            ...updated[index],
            inventory_item_id: itemIdStr,
            item_code: item.code || '',
            material_description: item.name,
            unit: item.unit || 'piece',
            current_stock: item.quantity || 0,
        };

        setLineItems(updated);
    };

    const handleQuantityChange = (index: number, qtyVal: string) => {
        const qty = parseFloat(qtyVal) || 0;
        const updated = [...lineItems];
        updated[index] = {
            ...updated[index],
            quantity: qty,
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
            toast.error(t('inventory.mrfSection.noForms') || 'Please add at least one received material item');
            return;
        }

        setSubmitting(true);

        const payload = {
            form_number: formNumber || undefined,
            station_id: stationId,
            location: location || undefined,
            from_plant: fromPlant || undefined,
            store_location: storeLocation || undefined,
            from_date: fromDate,
            to_date: toDate,
            received_by: receivedBy || undefined,
            approved_by: approvedBy || undefined,
            reviewed_by: reviewedBy || undefined,
            requested_by: requestedBy || undefined,
            remarks: remarks || undefined,
            items: validItems.map((li) => ({
                inventory_item_id: Number(li.inventory_item_id),
                quantity: li.quantity,
                part_serial_number: li.part_serial_number || undefined,
                valuation_type: li.valuation_type || undefined,
                bin_location: li.bin_location || undefined,
                sto_pro_no: li.sto_pro_no || undefined,
                invoice_no: li.invoice_no || undefined,
            })),
        };

        router.post('/mrf', payload, {
            onSuccess: () => {
                toast.success(t('inventory.mrfSection.createdSuccess'));
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
                        <PackageCheck className="h-6 w-6 text-emerald-600" />
                        {t('inventory.mrfSection.create')}
                    </DialogTitle>
                    <DialogDescription>
                        {t('inventory.mrfSection.subtitle')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                    {/* Header Controls Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* Station Select */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <Label htmlFor="station_id" className="text-sm font-medium">
                                {t('inventory.mrfSection.station')} <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={stationId}
                                onValueChange={(val) => {
                                    setStationId(val);
                                    setLineItems([
                                        {
                                            inventory_item_id: '',
                                            item_code: '',
                                            material_description: '',
                                            unit: '',
                                            current_stock: 0,
                                            quantity: 1,
                                            part_serial_number: '',
                                            valuation_type: '',
                                            bin_location: '',
                                            sto_pro_no: '',
                                            invoice_no: '',
                                        },
                                    ]);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={t('inventory.mrfSection.selectStation')} />
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
                                {t('inventory.mrfSection.formNumber')}
                            </Label>
                            <Input
                                id="form_number"
                                value={formNumber}
                                onChange={(e) => setFormNumber(e.target.value)}
                                placeholder={t('inventory.mrfSection.formNumberPlaceholder')}
                            />
                        </div>

                        {/* From Plant */}
                        <div className="space-y-1.5">
                            <Label htmlFor="from_plant" className="text-sm font-medium">
                                {t('inventory.mrfSection.fromPlant')}
                            </Label>
                            <Input
                                id="from_plant"
                                value={fromPlant}
                                onChange={(e) => setFromPlant(e.target.value)}
                                placeholder="Supplier / Vendor Plant"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-1.5">
                            <Label htmlFor="location" className="text-sm font-medium">
                                {t('inventory.mrfSection.location')}
                            </Label>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Receiving Yard / Dock"
                            />
                        </div>

                        {/* Store Location */}
                        <div className="space-y-1.5">
                            <Label htmlFor="store_location" className="text-sm font-medium">
                                {t('inventory.mrfSection.storeLocation')}
                            </Label>
                            <Input
                                id="store_location"
                                value={storeLocation}
                                onChange={(e) => setStoreLocation(e.target.value)}
                                placeholder="Main Station Warehouse"
                            />
                        </div>

                        {/* Received By */}
                        <div className="space-y-1.5">
                            <Label htmlFor="received_by" className="text-sm font-medium">
                                {t('inventory.mrfSection.receivedBy')}
                            </Label>
                            <Select value={receivedBy} onValueChange={setReceivedBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('inventory.mrfSection.receivedBy')} />
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

                        {/* Approved By */}
                        <div className="space-y-1.5">
                            <Label htmlFor="approved_by" className="text-sm font-medium">
                                {t('inventory.mrfSection.approvedBy')}
                            </Label>
                            <Select value={approvedBy} onValueChange={setApprovedBy}>
                                <SelectTrigger>
                                    <SelectValue placeholder={t('inventory.mrfSection.approvedBy')} />
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
                                {t('inventory.mrfSection.fromDate')}
                            </Label>
                            <Input
                                id="from_date"
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Remarks */}
                    <div className="space-y-1.5">
                        <Label htmlFor="remarks" className="text-sm font-medium">
                            {t('inventory.mrfSection.remarks')}
                        </Label>
                        <Textarea
                            id="remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows={2}
                            placeholder="Supplier delivery notes, invoice details..."
                        />
                    </div>

                    {/* Dynamic Material Items Table */}
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <PackageCheck className="h-4 w-4 text-emerald-600" />
                                {t('inventory.mrfSection.items')}
                            </h4>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={handleAddLineItem}
                                disabled={!stationId}
                                className="flex items-center gap-1.5 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                            >
                                <Plus className="h-4 w-4" />
                                {t('inventory.mrfSection.addItem')}
                            </Button>
                        </div>

                        {!stationId ? (
                            <div className="p-6 text-center border border-dashed rounded-xl text-sm text-gray-400">
                                {t('inventory.mrfSection.selectStation')} to choose stock items.
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
                                            <span>Received Item #{idx + 1}</span>
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
                                            {/* Select Inventory Item */}
                                            <div className="sm:col-span-2 space-y-1">
                                                <Label className="text-xs">{t('inventory.mrfSection.selectInventoryItem')}</Label>
                                                <Select
                                                    value={li.inventory_item_id}
                                                    onValueChange={(val) => handleSelectItem(idx, val)}
                                                >
                                                    <SelectTrigger className="h-9 text-xs">
                                                        <SelectValue placeholder={t('inventory.mrfSection.selectInventoryItem')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {stationInventoryItems.map((inv) => (
                                                            <SelectItem key={inv.id} value={inv.id.toString()}>
                                                                {inv.name} ({inv.code || 'No Code'}) &mdash; Current Stock: {inv.quantity} {inv.unit}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Quantity Received */}
                                            <div className="space-y-1">
                                                <Label className="text-xs text-emerald-600 font-bold">
                                                    {t('inventory.mrfSection.quantityReceived')}
                                                </Label>
                                                <Input
                                                    type="number"
                                                    step="0.001"
                                                    min="0.001"
                                                    className="h-9 text-xs font-mono font-bold text-emerald-600"
                                                    value={li.quantity}
                                                    onChange={(e) => handleQuantityChange(idx, e.target.value)}
                                                />
                                            </div>

                                            {/* Stock After Addition */}
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t('inventory.mrfSection.stockAfter')}</Label>
                                                <div className="h-9 px-3 flex items-center font-mono font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-900 border rounded-md text-xs">
                                                    {(li.current_stock + (li.quantity || 0)).toFixed(2)} {li.unit}
                                                </div>
                                            </div>

                                            {/* Part Serial Number */}
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t('inventory.mrfSection.partSerialNumber')}</Label>
                                                <Input
                                                    className="h-9 text-xs"
                                                    value={li.part_serial_number}
                                                    onChange={(e) => handleFieldChange(idx, 'part_serial_number', e.target.value)}
                                                    placeholder="SN-998231"
                                                />
                                            </div>

                                            {/* Bin Location */}
                                            <div className="space-y-1">
                                                <Label className="text-xs">{t('inventory.mrfSection.binLocation')}</Label>
                                                <Input
                                                    className="h-9 text-xs"
                                                    value={li.bin_location}
                                                    onChange={(e) => handleFieldChange(idx, 'bin_location', e.target.value)}
                                                    placeholder="Shelf A-02"
                                                />
                                            </div>

                                            {/* Invoice No */}
                                            <div className="space-y-1 sm:col-span-2">
                                                <Label className="text-xs">{t('inventory.mrfSection.invoiceNo')}</Label>
                                                <Input
                                                    className="h-9 text-xs"
                                                    value={li.invoice_no}
                                                    onChange={(e) => handleFieldChange(idx, 'invoice_no', e.target.value)}
                                                    placeholder="INV-2026-99"
                                                />
                                            </div>
                                        </div>
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
                            className="bg-emerald-600 hover:bg-emerald-700 font-bold"
                        >
                            {submitting ? t('common.loading') : t('inventory.mrfSection.submit')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

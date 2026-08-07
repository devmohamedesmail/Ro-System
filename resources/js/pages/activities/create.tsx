import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import toast from 'react-hot-toast';
import {
    ArrowLeft,
    Calendar,
    CheckSquare,
    Clock,
    FileUp,
    ListTodo,
    MapPin,
    Plus,
    Trash2,
    User,
    Wrench,
    X,
    FileText,
    Image as ImageIcon,
} from 'lucide-react';

interface RoUnit {
    id: number;
    name: string;
    code?: string | null;
}

interface Station {
    id: number;
    name: string;
    code?: string | null;
    ro_units?: RoUnit[];
}

interface UserOption {
    id: number;
    name: string;
    email: string;
}

interface CreateActivityPageProps {
    stations: Station[];
    users?: UserOption[];
}

export default function CreateActivityPage({ stations = [], users = [] }: CreateActivityPageProps) {
    const { t } = useTranslation();

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('maintenance');
    const [priority, setPriority] = useState('medium');
    const [status, setStatus] = useState('pending');
    const [stationId, setStationId] = useState('');
    const [roUnitId, setRoUnitId] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [plannedStartAt, setPlannedStartAt] = useState('');
    const [plannedEndAt, setPlannedEndAt] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [repeatEveryDays, setRepeatEveryDays] = useState('7');

    // Dynamic tasks list
    const [tasks, setTasks] = useState<string[]>(['']);

    // Selected files for attachment
    const [files, setFiles] = useState<File[]>([]);
    const [submitting, setSubmitting] = useState(false);

    // Derived list of RO units for the selected station
    const selectedStation = stations.find((s) => s.id.toString() === stationId);
    const roUnitsOptions = selectedStation?.ro_units || [];

    // Handlers for dynamic tasks
    const handleAddTask = () => {
        setTasks([...tasks, '']);
    };

    const handleRemoveTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleTaskChange = (index: number, val: string) => {
        const updated = [...tasks];
        updated[index] = val;
        setTasks(updated);
    };

    // Handlers for file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...selectedFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error(t('validation.required'));
            return;
        }

        setSubmitting(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('priority', priority);
        formData.append('status', status);

        if (stationId) formData.append('station_id', stationId);
        if (roUnitId) formData.append('ro_unit_id', roUnitId);
        if (assignedTo) formData.append('assigned_to', assignedTo);

        if (plannedStartAt) formData.append('planned_start_at', plannedStartAt);
        if (plannedEndAt) formData.append('planned_end_at', plannedEndAt);

        formData.append('is_recurring', isRecurring ? '1' : '0');
        if (isRecurring && repeatEveryDays) {
            formData.append('repeat_every_days', repeatEveryDays);
        }

        // Add task checklist
        const validTasks = tasks.filter((t) => t.trim() !== '');
        validTasks.forEach((tData, i) => {
            formData.append(`tasks[${i}]`, tData);
        });

        // Add attachments
        files.forEach((file) => {
            formData.append('attachments[]', file);
        });

        router.post('/activities/store', formData, {
            onSuccess: () => {
                toast.success(t('activities.createdSuccess'));
            },
            onError: (err) => {
                console.error(err);
                toast.error(t('common.error'));
            },
            onFinish: () => setSubmitting(false),
        });
    };

    return (
        <DashboardLayout>
            <Head title={`${t('activities.create')} — AquaRO`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Back link & Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            href="/activities"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        >
                            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                            {t('activities.title')}
                        </Link>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {t('activities.create')}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('activities.createSubtitle')}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* LEFT 2 COLUMNS: General Info, Tasks, Attachments */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Card 1: General Info */}
                            <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                                    <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                        <Wrench className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        {t('activities.generalInfo')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {/* Title */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="title" className="text-sm font-medium">
                                            {t('activities.activityTitle')} <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder={t('activities.activityTitlePlaceholder')}
                                            required
                                        />
                                    </div>

                                    {/* Type & Priority */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="type" className="text-sm font-medium">
                                                {t('activities.activityType')}
                                            </Label>
                                            <Select value={type} onValueChange={setType}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="maintenance">
                                                        {t('activities.typeMaintenance')}
                                                    </SelectItem>
                                                    <SelectItem value="inspection">
                                                        {t('activities.typeInspection')}
                                                    </SelectItem>
                                                    <SelectItem value="cleaning">
                                                        {t('activities.typeCleaning')}
                                                    </SelectItem>
                                                    <SelectItem value="replacement">
                                                        {t('activities.typeReplacement')}
                                                    </SelectItem>
                                                    <SelectItem value="calibration">
                                                        {t('activities.typeCalibration')}
                                                    </SelectItem>
                                                    <SelectItem value="audit">
                                                        {t('activities.typeAudit')}
                                                    </SelectItem>
                                                    <SelectItem value="other">
                                                        {t('activities.typeOther')}
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="priority" className="text-sm font-medium">
                                                {t('activities.priority')}
                                            </Label>
                                            <Select value={priority} onValueChange={setPriority}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="low">
                                                        <span className="flex items-center gap-2">
                                                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                                                            {t('activities.priorityLow')}
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="medium">
                                                        <span className="flex items-center gap-2">
                                                            <span className="h-2 w-2 rounded-full bg-amber-500" />
                                                            {t('activities.priorityMedium')}
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="high">
                                                        <span className="flex items-center gap-2">
                                                            <span className="h-2 w-2 rounded-full bg-orange-500" />
                                                            {t('activities.priorityHigh')}
                                                        </span>
                                                    </SelectItem>
                                                    <SelectItem value="urgent">
                                                        <span className="flex items-center gap-2 font-bold text-red-600">
                                                            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                                                            {t('activities.priorityUrgent')}
                                                        </span>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="description" className="text-sm font-medium">
                                            {t('ro-units.fields.description')}
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={4}
                                            placeholder={t('readings.notes_placeholder')}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card 2: Sub-tasks Checklist */}
                            <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                                <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 py-4 dark:border-gray-800">
                                    <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                        <ListTodo className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        {t('activities.tasksChecklist')}
                                    </CardTitle>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={handleAddTask}
                                        className="flex items-center gap-1.5 border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-900 dark:text-indigo-400"
                                    >
                                        <Plus className="h-4 w-4" />
                                        {t('activities.addTask')}
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-3 pt-6">
                                    {tasks.map((task, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                #{index + 1}
                                            </div>
                                            <Input
                                                value={task}
                                                onChange={(e) => handleTaskChange(index, e.target.value)}
                                                placeholder={t('activities.taskPlaceholder')}
                                                className="flex-1"
                                            />
                                            {tasks.length > 1 && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleRemoveTask(index)}
                                                    className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Card 3: Attachments & Images */}
                            <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                                <CardHeader className="border-b border-gray-100 py-4 dark:border-gray-800">
                                    <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                        <FileUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                                        {t('activities.attachments')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {/* Upload Area */}
                                    <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center transition hover:bg-blue-50/30 dark:border-gray-800 dark:bg-gray-900/50">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,.pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 cursor-pointer opacity-0"
                                        />
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                            <FileUp className="h-6 w-6" />
                                        </div>
                                        <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                                            {t('activities.uploadFiles')}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-w-md">
                                            {t('activities.uploadHelp')}
                                        </p>
                                    </div>

                                    {/* Selected Files List */}
                                    {files.length > 0 && (
                                        <div className="space-y-2 pt-2">
                                            {files.map((file, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                                                >
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        {file.type.startsWith('image/') ? (
                                                            <ImageIcon className="h-5 w-5 shrink-0 text-blue-500" />
                                                        ) : (
                                                            <FileText className="h-5 w-5 shrink-0 text-amber-500" />
                                                        )}
                                                        <div className="truncate text-xs">
                                                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                                                                {file.name}
                                                            </p>
                                                            <p className="text-gray-400">
                                                                {(file.size / 1024).toFixed(1)} KB
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleRemoveFile(idx)}
                                                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* RIGHT 1 COLUMN: Location, Assignee, Schedule */}
                        <div className="space-y-6">
                            {/* Card 4: Location & Assignee */}
                            <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                                <CardHeader className="border-b border-gray-100 py-4 dark:border-gray-800">
                                    <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                        <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        {t('activities.locationAndAssignee')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {/* Station Select */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="station_id" className="text-sm font-medium">
                                            {t('activities.selectStation')}
                                        </Label>
                                        <Select
                                            value={stationId}
                                            onValueChange={(val) => {
                                                setStationId(val);
                                                setRoUnitId(''); // reset ro_unit when station changes
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('activities.selectStation')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {stations.map((st) => (
                                                    <SelectItem key={st.id} value={st.id.toString()}>
                                                        {st.name} ({st.code})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* RO Unit Select */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="ro_unit_id" className="text-sm font-medium">
                                            {t('activities.selectRoUnit')}
                                        </Label>
                                        <Select
                                            value={roUnitId}
                                            onValueChange={setRoUnitId}
                                            disabled={!stationId || roUnitsOptions.length === 0}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('activities.selectRoUnit')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roUnitsOptions.map((unit) => (
                                                    <SelectItem key={unit.id} value={unit.id.toString()}>
                                                        {unit.name} ({unit.code})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Assigned To Select */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="assigned_to" className="text-sm font-medium">
                                            {t('activities.assignTo')}
                                        </Label>
                                        <Select value={assignedTo} onValueChange={setAssignedTo}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('activities.unassigned')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((u) => (
                                                    <SelectItem key={u.id} value={u.id.toString()}>
                                                        {u.name} ({u.email})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="status" className="text-sm font-medium">
                                            {t('activities.status')}
                                        </Label>
                                        <Select value={status} onValueChange={setStatus}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">
                                                    {t('activities.statusPending')}
                                                </SelectItem>
                                                <SelectItem value="in_progress">
                                                    {t('activities.statusInProgress')}
                                                </SelectItem>
                                                <SelectItem value="completed">
                                                    {t('activities.statusCompleted')}
                                                </SelectItem>
                                                <SelectItem value="cancelled">
                                                    {t('activities.statusCancelled')}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Card 5: Schedule & Recurrence */}
                            <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                                <CardHeader className="border-b border-gray-100 py-4 dark:border-gray-800">
                                    <CardTitle className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white">
                                        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                        {t('activities.datesAndRecurring')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-6">
                                    {/* Planned Start */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="planned_start_at" className="text-xs font-medium">
                                            {t('activities.plannedStartAt')}
                                        </Label>
                                        <Input
                                            id="planned_start_at"
                                            type="datetime-local"
                                            value={plannedStartAt}
                                            onChange={(e) => setPlannedStartAt(e.target.value)}
                                        />
                                    </div>

                                    {/* Planned End */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="planned_end_at" className="text-xs font-medium">
                                            {t('activities.plannedEndAt')}
                                        </Label>
                                        <Input
                                            id="planned_end_at"
                                            type="datetime-local"
                                            value={plannedEndAt}
                                            onChange={(e) => setPlannedEndAt(e.target.value)}
                                        />
                                    </div>

                                    {/* Recurring checkbox */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <Checkbox
                                            id="is_recurring"
                                            checked={isRecurring}
                                            onCheckedChange={(c) => setIsRecurring(Boolean(c))}
                                        />
                                        <Label htmlFor="is_recurring" className="cursor-pointer text-sm font-medium">
                                            {t('activities.isRecurring')}
                                        </Label>
                                    </div>

                                    {isRecurring && (
                                        <div className="space-y-1.5 pt-1">
                                            <Label htmlFor="repeat_every_days" className="text-xs font-medium">
                                                {t('activities.repeatEveryDays')}
                                            </Label>
                                            <Input
                                                id="repeat_every_days"
                                                type="number"
                                                min={1}
                                                value={repeatEveryDays}
                                                onChange={(e) => setRepeatEveryDays(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Submit & Cancel Actions Card */}
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-blue-600 py-6 text-base font-bold shadow-md hover:bg-blue-700"
                                >
                                    {submitting ? t('common.loading') : t('activities.submitActivity')}
                                </Button>

                                <Link href="/activities">
                                    <Button type="button" variant="outline" className="w-full">
                                        {t('common.cancel')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}

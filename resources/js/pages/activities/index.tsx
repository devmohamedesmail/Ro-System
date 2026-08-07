import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';
import {
    Activity as ActivityIcon,
    AlertCircle,
    Calendar,
    CheckCircle2,
    Clock,
    Cpu,
    FileText,
    Filter,
    FolderKanban,
    Grid,
    Image as ImageIcon,
    ListTodo,
    MapPin,
    Plus,
    RefreshCw,
    Search,
    User,
    Wrench,
    XCircle,
    ExternalLink,
    Paperclip,
} from 'lucide-react';

interface ActivityTask {
    id: number;
    activity_id: number;
    title: string;
    is_completed: boolean;
    completed_at?: string | null;
    completed_by?: number | null;
    order: number;
}

interface ActivityAttachment {
    id: number;
    activity_id: number;
    uploaded_by?: string | null;
    file?: string | null;
}

interface Station {
    id: number;
    name: string;
    code?: string | null;
    ro_units?: { id: number; name: string; code?: string | null }[];
}

interface UserSummary {
    id: number;
    name: string;
    email: string;
}

interface Activity {
    id: number;
    title: string;
    description?: string | null;
    type: 'maintenance' | 'inspection' | 'cleaning' | 'replacement' | 'calibration' | 'audit' | 'other';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    planned_start_at?: string | null;
    planned_end_at?: string | null;
    started_at?: string | null;
    completed_at?: string | null;
    is_recurring: boolean;
    repeat_every_days?: number | null;
    station_id?: number | null;
    station?: Station | null;
    ro_unit_id?: number | null;
    ro_unit?: { id: number; name: string; code?: string | null } | null;
    creator?: UserSummary | null;
    assignee?: UserSummary | null;
    tasks?: ActivityTask[];
    attachments?: ActivityAttachment[];
    created_at?: string;
}

interface IndexProps {
    activities: Activity[];
    stations: Station[];
}

export default function ActivitiesIndexPage({ activities = [], stations = [] }: IndexProps) {
    const { t } = useTranslation();

    // Filters state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStation, setSelectedStation] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedPriority, setSelectedPriority] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'grouped'>('grid');

    // Selected image modal preview
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Compute metrics
    const totalCount = activities.length;
    const pendingCount = activities.filter((a) => a.status === 'pending').length;
    const inProgressCount = activities.filter((a) => a.status === 'in_progress').length;
    const completedCount = activities.filter((a) => a.status === 'completed').length;

    // Filtered activities
    const filteredActivities = useMemo(() => {
        return activities.filter((activity) => {
            // Search query filter
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const titleMatch = activity.title.toLowerCase().includes(q);
                const descMatch = activity.description?.toLowerCase().includes(q);
                const stationMatch = activity.station?.name.toLowerCase().includes(q);
                const roMatch = activity.ro_unit?.name.toLowerCase().includes(q);
                const assigneeMatch = activity.assignee?.name.toLowerCase().includes(q);
                if (!titleMatch && !descMatch && !stationMatch && !roMatch && !assigneeMatch) {
                    return false;
                }
            }

            // Station filter
            if (selectedStation !== 'all' && activity.station_id?.toString() !== selectedStation) {
                return false;
            }

            // Status filter
            if (selectedStatus !== 'all' && activity.status !== selectedStatus) {
                return false;
            }

            // Priority filter
            if (selectedPriority !== 'all' && activity.priority !== selectedPriority) {
                return false;
            }

            // Type filter
            if (selectedType !== 'all' && activity.type !== selectedType) {
                return false;
            }

            return true;
        });
    }, [activities, searchQuery, selectedStation, selectedStatus, selectedPriority, selectedType]);

    // Grouped by station
    const groupedByStation = useMemo(() => {
        const groups: Record<string, { station: Station | null; items: Activity[] }> = {};
        filteredActivities.forEach((act) => {
            const key = act.station_id ? act.station_id.toString() : 'unassigned';
            if (!groups[key]) {
                groups[key] = {
                    station: act.station || null,
                    items: [],
                };
            }
            groups[key].items.push(act);
        });
        return groups;
    }, [filteredActivities]);

    // Toggle Task completion handler
    const handleToggleTask = (taskId: number) => {
        router.post(
            `/activities/tasks/${taskId}/toggle`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(t('common.updated') || 'Task updated');
                },
            }
        );
    };

    // Update Activity Status handler
    const handleUpdateStatus = (activityId: number, status: string) => {
        router.put(
            `/activities/${activityId}/status`,
            { status },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(t('common.updated') || 'Status updated');
                },
            }
        );
    };

    // Render helpers for Type & Priority Badges
    const renderTypeBadge = (type: Activity['type']) => {
        const typeLabels: Record<string, string> = {
            maintenance: t('activities.typeMaintenance'),
            inspection: t('activities.typeInspection'),
            cleaning: t('activities.typeCleaning'),
            replacement: t('activities.typeReplacement'),
            calibration: t('activities.typeCalibration'),
            audit: t('activities.typeAudit'),
            other: t('activities.typeOther'),
        };

        return (
            <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                <Wrench className="h-3 w-3" />
                {typeLabels[type] || type}
            </Badge>
        );
    };

    const renderPriorityBadge = (priority: Activity['priority']) => {
        switch (priority) {
            case 'urgent':
                return (
                    <Badge className="bg-red-500/10 text-red-600 border-red-200 dark:bg-red-950/60 dark:text-red-400 gap-1 font-bold">
                        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                        {t('activities.priorityUrgent')}
                    </Badge>
                );
            case 'high':
                return (
                    <Badge className="bg-orange-500/10 text-orange-600 border-orange-200 dark:bg-orange-950/60 dark:text-orange-400 gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {t('activities.priorityHigh')}
                    </Badge>
                );
            case 'medium':
                return (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 gap-1">
                        {t('activities.priorityMedium')}
                    </Badge>
                );
            case 'low':
            default:
                return (
                    <Badge variant="secondary" className="gap-1 text-gray-500">
                        {t('activities.priorityLow')}
                    </Badge>
                );
        }
    };

    return (
        <DashboardLayout>
            <Head title={`${t('activities.title')} — AquaRO`} />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header Banner */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                            <FolderKanban className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            {t('activities.title')}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {t('activities.createSubtitle')}
                        </p>
                    </div>

                    <Link href="/activities/create/page">
                        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 font-bold">
                            <Plus className="h-4 w-4" />
                            {t('activities.create')}
                        </Button>
                    </Link>
                </div>

                {/* KPI Summary Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <ActivityIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('common.all') || 'Total Activities'}
                                </p>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                    {totalCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('activities.statusPending')}
                                </p>
                                <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                                    {pendingCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                                <RefreshCw className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('activities.statusInProgress')}
                                </p>
                                <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                                    {inProgressCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                        <CardContent className="flex items-center gap-4 p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    {t('activities.statusCompleted')}
                                </p>
                                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                                    {completedCount}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filter & View Toolbar */}
                <Card className="border-gray-200 shadow-sm dark:border-gray-800">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            {/* Search bar */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 rtl:right-3 rtl:left-auto" />
                                <Input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('common.search') || 'Search activities, stations, assignees...'}
                                    className="pl-9 rtl:pr-9 rtl:pl-3"
                                />
                            </div>

                            {/* View Switcher */}
                            <div className="flex items-center gap-1.5 self-end lg:self-auto">
                                <Button
                                    size="sm"
                                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                                    onClick={() => setViewMode('grid')}
                                    className="flex items-center gap-1.5"
                                >
                                    <Grid className="h-4 w-4" />
                                    Grid
                                </Button>
                                <Button
                                    size="sm"
                                    variant={viewMode === 'grouped' ? 'default' : 'outline'}
                                    onClick={() => setViewMode('grouped')}
                                    className="flex items-center gap-1.5"
                                >
                                    <MapPin className="h-4 w-4" />
                                    By Station
                                </Button>
                            </div>
                        </div>

                        {/* Dropdown Filters row */}
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {/* Station Filter */}
                            <Select value={selectedStation} onValueChange={setSelectedStation}>
                                <SelectTrigger className="text-xs">
                                    <SelectValue placeholder={t('activities.selectStation')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('common.all') || 'All Stations'}</SelectItem>
                                    {stations.map((s) => (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="text-xs">
                                    <SelectValue placeholder={t('activities.status')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('common.all') || 'All Statuses'}</SelectItem>
                                    <SelectItem value="pending">{t('activities.statusPending')}</SelectItem>
                                    <SelectItem value="in_progress">{t('activities.statusInProgress')}</SelectItem>
                                    <SelectItem value="completed">{t('activities.statusCompleted')}</SelectItem>
                                    <SelectItem value="cancelled">{t('activities.statusCancelled')}</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Priority Filter */}
                            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                                <SelectTrigger className="text-xs">
                                    <SelectValue placeholder={t('activities.priority')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('common.all') || 'All Priorities'}</SelectItem>
                                    <SelectItem value="urgent">{t('activities.priorityUrgent')}</SelectItem>
                                    <SelectItem value="high">{t('activities.priorityHigh')}</SelectItem>
                                    <SelectItem value="medium">{t('activities.priorityMedium')}</SelectItem>
                                    <SelectItem value="low">{t('activities.priorityLow')}</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Type Filter */}
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="text-xs">
                                    <SelectValue placeholder={t('activities.activityType')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('common.all') || 'All Types'}</SelectItem>
                                    <SelectItem value="maintenance">{t('activities.typeMaintenance')}</SelectItem>
                                    <SelectItem value="inspection">{t('activities.typeInspection')}</SelectItem>
                                    <SelectItem value="cleaning">{t('activities.typeCleaning')}</SelectItem>
                                    <SelectItem value="replacement">{t('activities.typeReplacement')}</SelectItem>
                                    <SelectItem value="calibration">{t('activities.typeCalibration')}</SelectItem>
                                    <SelectItem value="audit">{t('activities.typeAudit')}</SelectItem>
                                    <SelectItem value="other">{t('activities.typeOther')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Activities Container */}
                {filteredActivities.length === 0 ? (
                    /* Empty State */
                    <Card className="border-gray-200 p-12 text-center shadow-sm dark:border-gray-800">
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                                <FolderKanban className="h-8 w-8" />
                            </div>
                            <div className="max-w-sm space-y-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {t('common.noData') || 'No activities found'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('activities.createSubtitle')}
                                </p>
                            </div>
                            <Link href="/activities/create/page">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Plus className="mr-2 h-4 w-4" />
                                    {t('activities.create')}
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : viewMode === 'grid' ? (
                    /* Grid Layout View */
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredActivities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                activity={activity}
                                onToggleTask={handleToggleTask}
                                onUpdateStatus={handleUpdateStatus}
                                onPreviewImage={setPreviewImage}
                                renderTypeBadge={renderTypeBadge}
                                renderPriorityBadge={renderPriorityBadge}
                            />
                        ))}
                    </div>
                ) : (
                    /* Grouped by Station View */
                    <div className="space-y-8">
                        {Object.entries(groupedByStation).map(([key, group]) => (
                            <div key={key} className="space-y-4">
                                <div className="flex items-center gap-2 border-b border-gray-200 pb-2 dark:border-gray-800">
                                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {group.station ? group.station.name : t('activities.unassigned')}
                                    </h2>
                                    {group.station?.code && (
                                        <Badge variant="outline">{group.station.code}</Badge>
                                    )}
                                    <Badge className="ml-auto bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                        {group.items.length} {t('activities.title')}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {group.items.map((activity) => (
                                        <ActivityCard
                                            key={activity.id}
                                            activity={activity}
                                            onToggleTask={handleToggleTask}
                                            onUpdateStatus={handleUpdateStatus}
                                            onPreviewImage={setPreviewImage}
                                            renderTypeBadge={renderTypeBadge}
                                            renderPriorityBadge={renderPriorityBadge}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Image Preview Modal */}
            {previewImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setPreviewImage(null)}
                >
                    <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl">
                        <img
                            src={previewImage}
                            alt="Attachment preview"
                            className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
                        />
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

/* Individual Activity Card Component */
interface ActivityCardProps {
    activity: Activity;
    onToggleTask: (taskId: number) => void;
    onUpdateStatus: (activityId: number, status: string) => void;
    onPreviewImage: (url: string) => void;
    renderTypeBadge: (type: Activity['type']) => React.ReactNode;
    renderPriorityBadge: (priority: Activity['priority']) => React.ReactNode;
}

function ActivityCard({
    activity,
    onToggleTask,
    onUpdateStatus,
    onPreviewImage,
    renderTypeBadge,
    renderPriorityBadge,
}: ActivityCardProps) {
    const { t } = useTranslation();
    const tasks = activity.tasks || [];
    const attachments = activity.attachments || [];

    const completedTasksCount = tasks.filter((t) => t.is_completed).length;
    const taskProgressPercent = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

    return (
        <Card className="flex flex-col justify-between overflow-hidden border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div>
                {/* Card Top Banner: Badges & Status Selector */}
                <CardHeader className="border-b border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            {renderTypeBadge(activity.type)}
                            {renderPriorityBadge(activity.priority)}
                        </div>

                        {/* Status Select */}
                        <Select
                            value={activity.status}
                            onValueChange={(val) => onUpdateStatus(activity.id, val)}
                        >
                            <SelectTrigger className="h-7 w-32 text-xs font-semibold">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">{t('activities.statusPending')}</SelectItem>
                                <SelectItem value="in_progress">{t('activities.statusInProgress')}</SelectItem>
                                <SelectItem value="completed">{t('activities.statusCompleted')}</SelectItem>
                                <SelectItem value="cancelled">{t('activities.statusCancelled')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>

                {/* Card Main Body */}
                <CardContent className="space-y-4 p-5">
                    {/* Title & Description */}
                    <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                            {activity.title}
                        </h3>
                        {activity.description && (
                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                {activity.description}
                            </p>
                        )}
                    </div>

                    {/* Location Info Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        {activity.station && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1 font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                                <MapPin className="h-3 w-3" />
                                {activity.station.name}
                            </span>
                        )}
                        {activity.ro_unit && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2.5 py-1 font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                                <Cpu className="h-3 w-3" />
                                {activity.ro_unit.name}
                            </span>
                        )}
                    </div>

                    {/* Assignee & Dates info */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400 border-t border-b border-gray-100 py-3 dark:border-gray-800">
                        <div>
                            <span className="block font-medium text-gray-400">{t('activities.assignTo')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1 mt-0.5">
                                <User className="h-3 w-3 text-blue-500" />
                                {activity.assignee ? activity.assignee.name : t('activities.unassigned')}
                            </span>
                        </div>

                        <div>
                            <span className="block font-medium text-gray-400">{t('activities.plannedStartAt')}</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1 mt-0.5">
                                <Calendar className="h-3 w-3 text-amber-500" />
                                {activity.planned_start_at
                                    ? new Date(activity.planned_start_at).toLocaleDateString()
                                    : t('ro-units.notSpecified')}
                            </span>
                        </div>
                    </div>

                    {/* Tasks Checklist Accordion Section */}
                    {tasks.length > 0 && (
                        <div className="space-y-2 rounded-xl bg-gray-50 p-3.5 dark:bg-gray-800/40">
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                                    <ListTodo className="h-4 w-4 text-indigo-500" />
                                    {t('activities.tasksChecklist')} ({completedTasksCount}/{tasks.length})
                                </span>
                                <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                                    {taskProgressPercent}%
                                </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 transition-all duration-300"
                                    style={{ width: `${taskProgressPercent}%` }}
                                />
                            </div>

                            {/* Task Items */}
                            <div className="space-y-1.5 pt-1">
                                {tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        onClick={() => onToggleTask(task.id)}
                                        className="flex items-center gap-2 cursor-pointer rounded-lg p-1.5 hover:bg-white dark:hover:bg-gray-800 transition"
                                    >
                                        <Checkbox checked={task.is_completed} onCheckedChange={() => onToggleTask(task.id)} />
                                        <span
                                            className={`text-xs ${
                                                task.is_completed
                                                    ? 'line-through text-gray-400 dark:text-gray-500'
                                                    : 'text-gray-800 dark:text-gray-200 font-medium'
                                            }`}
                                        >
                                            {task.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Attachments Section */}
                    {attachments.length > 0 && (
                        <div className="space-y-2 pt-1">
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Paperclip className="h-3.5 w-3.5 text-teal-500" />
                                {t('activities.attachments')} ({attachments.length})
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {attachments.map((att) => {
                                    if (!att.file) return null;
                                    const isImage = att.file.match(/\.(jpeg|jpg|gif|png|webp)/i);

                                    return isImage ? (
                                        <div
                                            key={att.id}
                                            onClick={() => onPreviewImage(att.file!)}
                                            className="group relative h-14 w-14 overflow-hidden rounded-xl border border-gray-200 cursor-pointer dark:border-gray-700"
                                        >
                                            <img
                                                src={att.file}
                                                alt="Attachment"
                                                className="h-full w-full object-cover transition group-hover:scale-110"
                                            />
                                        </div>
                                    ) : (
                                        <a
                                            key={att.id}
                                            href={att.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                        >
                                            <FileText className="h-3.5 w-3.5 text-amber-500" />
                                            Doc
                                            <ExternalLink className="h-3 w-3 text-gray-400" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </CardContent>
            </div>
        </Card>
    );
}

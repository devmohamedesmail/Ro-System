import { useRegisterSW } from 'virtual:pwa-register/react'

export default function PWA() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW()

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    if (!offlineReady && !needRefresh) {
        return null
    }

    return (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-white p-4 shadow-xl border">
            {offlineReady && (
                <div>
                    <p className="font-semibold">
                        RO System جاهز للعمل Offline
                    </p>

                    <button
                        onClick={close}
                        className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-white"
                    >
                        إغلاق
                    </button>
                </div>
            )}

            {needRefresh && (
                <div>
                    <p className="font-semibold">
                        يوجد تحديث جديد
                    </p>

                    <button
                        onClick={() => updateServiceWorker(true)}
                        className="mt-2 rounded-lg bg-cyan-600 px-4 py-2 text-white"
                    >
                        تحديث
                    </button>
                </div>
            )}
        </div>
    )
}
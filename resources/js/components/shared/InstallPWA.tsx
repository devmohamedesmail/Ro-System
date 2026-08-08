import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed'
        platform: string
    }>
}

export default function InstallPWA() {
    const [installPrompt, setInstallPrompt] =
        useState<BeforeInstallPromptEvent | null>(null)

    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        const handler = (event: Event) => {
            event.preventDefault()

            setInstallPrompt(
                event as BeforeInstallPromptEvent
            )
        }

        window.addEventListener(
            'beforeinstallprompt',
            handler
        )

        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true)
        }

        return () => {
            window.removeEventListener(
                'beforeinstallprompt',
                handler
            )
        }
    }, [])

    const installApp = async () => {
        if (!installPrompt) {
            return
        }

        await installPrompt.prompt()

        const { outcome } = await installPrompt.userChoice

        console.log('Install result:', outcome)

        setInstallPrompt(null)
    }

    if (isInstalled || !installPrompt) {
        return null
    }

    return (
           <button
            onClick={installApp}
            className="fixed bottom-5 right-5 z-[9999] rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white shadow-xl hover:bg-cyan-700"
        >
            Install RO System
        </button>
    )
}
import useSetting from '@/hooks/use-setting';
import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const { settings } = useSetting()


    return (
        <div>
            <img
                className="w-44 h-44"
                loading="lazy"
                src={settings?.app_logo ?? undefined}
                alt={settings?.app_name_ar}
            />
        </div>
    );
}

import React from 'react'
import { DashboardLayout } from '../dashboard/components/DashboardLayout'

export default function RoUnitReadings({ ro_unit }: { ro_unit: any }) {
    console.log("ro unit",ro_unit)
    return (
        <DashboardLayout>
            <div>
                <h1>{ro_unit.name}</h1>
            </div>
        </DashboardLayout>
    )
}

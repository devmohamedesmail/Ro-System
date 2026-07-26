import React from 'react'
import { DashboardLayout } from '../dashboard/components/DashboardLayout'

export default function DailyReports({ stations }: { stations: Array<{ roUnits: Array<{}> }> }) {

  console.log(stations)
  return (
    <DashboardLayout>
      <div>Resports</div>
    </DashboardLayout>
  )
}

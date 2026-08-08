import React from 'react'
import { DashboardLayout } from '../dashboard/components/DashboardLayout'
import PageTitle from '@/components/shared/page-title'
import InstallPWA from '@/components/shared/InstallPWA'
import ComingSoon from '@/components/shared/coming-soon'

export default function operators({ operators }: any) {
  console.log("operators", operators)
  return (
    <DashboardLayout>
      <div className="container mx-auto p-3">
        
        <ComingSoon />
       
        {/* {operators.map((station: any) => (<div>
          {station.name}
          <div>
            {station.users.map((user: any) => (<div>{user.name}</div>))}
          </div>
        </div>))} */}
      </div>
    </DashboardLayout>
  )
}

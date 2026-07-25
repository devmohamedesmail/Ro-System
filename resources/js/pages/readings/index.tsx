
import { DashboardLayout } from '../dashboard/components/DashboardLayout'
import { Droplets, EqualApproximatelyIcon, NotepadTextDashed, Plus } from 'lucide-react'
import useImport from '@/hooks/use-import'
import useComapny from '@/hooks/use-comapny'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFormik } from 'formik'

export default function RoReadings({ stations }: any) {
  const { t } = useImport();
  const { company } = useComapny()



const formik = useFormik({
  initialValues:{
    
  },
  onSubmit:(values)=>{

  }
})


  return (
    <DashboardLayout>
      <div className="container mx-auto p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 shadow-md shadow-cyan-200 dark:shadow-cyan-900/30">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('ro-units.title')}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {company?.name} &mdash; {t('ro-units.subtitle')}
              </p>
            </div>
          </div>

          <Button
            // onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            {t('ro-units.create')}
          </Button>
        </div>

        <Tabs>
          <TabsList className='flex py-3'>
            <TabsTrigger className="h-12" value="overview">overview</TabsTrigger>
            <TabsTrigger value="overview2">overview</TabsTrigger>
            <TabsTrigger value="overview3">overview</TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>overview</TabsContent>
          <TabsContent value='overview2'>overview2</TabsContent>
          <TabsContent value='overview3'>overview3</TabsContent>
        </Tabs>


        {stations?.map((station: any) => (
          <form action="">
            <div>
              <h1 className='text-center text-3xl'>{station.name}</h1>
              {station.ro_units.map((unit: any) => (
                <div>
                  <h1 className='text-center text-3xl'>{unit.name}</h1>
                  {unit.reading_categories.map((category: any) => (
                    <div className='my-5 border border-2 border-primary '>
                      <h1 className='font-bold mb-3 bg-primary text-white p-3'>{category.name}</h1>



                      <div className="container p-3">
                        {category.parameters.length === 0 ? (
                          <div className='flex items-center justify-center flex-col'>
                            <NotepadTextDashed size={30} className='text-red-600 text-5xl' />
                            <h1 className='text-xs'>
                              {t("readings.no-parameters")}</h1>
                          </div>
                        ) : (
                          <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                            {category.parameters.map((parameter: any) => (
                              <div>
                                <Label> {parameter.name}</Label>
                                <Input />
                              </div>
                            ))}
                          </div>
                        )}

                      </div>




                    </div>
                  ))}

                </div>
              ))}
            </div>
            <Button type='submit'>{t("common.save")}</Button>
          </form>
        ))}



      </div>


    </DashboardLayout>
  )
}

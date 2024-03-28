import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogDeveloperDetails } from './DialogDeveloperDetails'
import { DialogUpdateStatusJob } from './DialogUpdateStatusJob'

interface DialogMyJobsProps {
  candidatures: {
    candidatureId: string
    status: string
    userId: string
    userName: string
    occupation_area: string
  }[]
}

export function DialogMyJobs({ candidatures }: DialogMyJobsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="m-1 h-full transform rounded-md bg-gradient-to-r from-violet-900 to-violet-500/50 text-xs font-bold text-white transition-transform duration-200 hover:scale-95 hover:bg-violet-700 hover:text-white"
        >
          Ver candidatos
        </Button>
      </DialogTrigger>
      <DialogContent className="animate-slideDownAndFade">
        <div className="mb-5 flex w-full flex-col items-center justify-center rounded-md font-mirza text-2xl font-bold text-violet-500">
          <span className="-ml-4">
            E<span className="text-base font-normal">asy</span>
          </span>
          <span className="-mr-2 -mt-4">
            W<span className="text-base font-normal">ork</span>
          </span>
        </div>
        <DialogHeader className="mb-2 flex divide-y divide-dashed divide-violet-500 rounded-md bg-violet-200 p-2">
          {candidatures.length === 0 ? (
            <p className="m-auto flex">Nenhuma candidatura até o momento...</p>
          ) : (
            candidatures.map((item) => (
              <div key={item.userId} className="flex w-full flex-col gap-2">
                <div>
                  <DialogTitle className="flex justify-center text-xl">
                    {item.userName.charAt(0).toUpperCase() +
                      item.userName.slice(1)}
                  </DialogTitle>
                  <p className="flex w-full justify-center text-xs font-semibold text-zinc-700 xl:text-sm">
                    {item.occupation_area.charAt(0).toUpperCase() +
                      item.occupation_area.slice(1)}
                  </p>
                </div>
                <span className="m-auto flex max-w-96 truncate rounded-md border-b border-violet-600 p-1 text-xs font-semibold text-zinc-800 xl:text-sm">
                  {`Status: ${item.status}`}
                </span>
                <div className="flex items-center justify-between">
                  <DialogUpdateStatusJob param={item.candidatureId} />
                  <DialogDeveloperDetails param={item.userId} />
                </div>
              </div>
            ))
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

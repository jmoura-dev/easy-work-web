import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function JobAlert({ ...props }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md bg-gradient-to-r from-violet-900 to-violet-500/50 p-2 text-minimum font-bold text-white hover:bg-violet-700 xl:text-xs">
        CANDIDATAR-SE
      </AlertDialogTrigger>
      <AlertDialogContent className="animate-slideDownAndFade">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="mb-5 flex w-full flex-col items-center justify-center rounded-md font-mirza text-2xl font-bold text-violet-500">
              <span className="-ml-4">
                E<span className="text-base font-normal">asy</span>
              </span>
              <span className="-mr-2 -mt-4">
                W<span className="text-base font-normal">ork</span>
              </span>
            </div>
            Tem certeza que deseja aplicar para esta vaga?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao se candidatar, seu currículo será enviado para a empresa
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-start justify-between sm:justify-between">
          <AlertDialogAction
            {...props}
            className="bg-violet-600 hover:bg-violet-700"
          >
            Confirmar
          </AlertDialogAction>
          <AlertDialogCancel className="m-0">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

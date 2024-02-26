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

export function JobAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-md bg-gradient-to-r from-violet-900 to-violet-500/50 p-2 text-minimum font-bold text-white hover:bg-violet-700 xl:text-xs">
        CANDIDATAR-SE
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <p>Easy Work</p>
            Tem certeza que deseja aplicar para esta vaga?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao se candidatar, seu currículo será enviado para a empresa
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-start justify-between sm:justify-between">
          <AlertDialogAction className="bg-violet-600 hover:bg-violet-700">
            Continue
          </AlertDialogAction>
          <AlertDialogCancel className="m-0">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

import { api } from '@/app/api/axios'

interface DevelopersProps {
  developersWithTechs: {
    about: string
    available_for_contract: boolean
    developerId: string
    occupation_area: string
    price_per_hour: number
    techs: {
      name: string
      id: number
    }[]
    userName: string
  }[]
}

export async function getDevelopers(): Promise<DevelopersProps> {
  const response = await api.get('/developers/list')

  return response.data
}

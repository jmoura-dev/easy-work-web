'use client'

import { createContext, useState, ReactNode } from 'react'

interface TechnologiesProps {
  id: number
  name: string
}

interface AllTechnologiesProps {
  allTechnologies: TechnologiesProps[]
}

interface TechnologiesContextProviderProps {
  children: ReactNode
}

export const TechnologiesContext = createContext({} as AllTechnologiesProps)

export function TechnologiesContextProvider({
  children,
}: TechnologiesContextProviderProps) {
  const technologies = [
    { name: 'Nodejs', id: 1 },
    { name: 'React', id: 2 },
    { name: 'Angular', id: 3 },
    { name: 'Vue.js', id: 4 },
    { name: 'Express', id: 5 },
    { name: 'MongoDB', id: 6 },
    { name: 'Redux', id: 7 },
    { name: 'Webpack', id: 8 },
    { name: 'Django', id: 9 },
    { name: 'Flask', id: 10 },
    { name: 'Pyramid', id: 11 },
    { name: 'Pandas', id: 12 },
    { name: 'NumPy', id: 13 },
    { name: 'Matplotlib', id: 14 },
    { name: 'Spring-Boot', id: 15 },
    { name: 'Hibernate', id: 16 },
    { name: 'Maven', id: 17 },
    { name: 'JUnit', id: 18 },
    { name: 'Tomcat', id: 19 },
    { name: 'JavaFX', id: 20 },
    { name: 'JPA', id: 21 },
    { name: 'Docker', id: 22 },
    { name: 'Kubernetes', id: 23 },
    { name: 'TypeScript', id: 24 },
    { name: 'NestJS', id: 25 },
    { name: 'AngularJS', id: 26 },
  ]

  const [allTechnologies, setAllTechnologies] =
    useState<TechnologiesProps[]>(technologies)

  return (
    <TechnologiesContext.Provider value={{ allTechnologies }}>
      {children}
    </TechnologiesContext.Provider>
  )
}

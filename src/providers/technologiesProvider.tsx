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
    { name: 'Spring boot', id: 1 },
    { name: 'Hibernate', id: 2 },
    { name: 'Apache Struts', id: 3 },
    { name: 'Apache Wicket', id: 4 },
    { name: 'Java', id: 5 },
    { name: 'Grails', id: 6 },
    { name: 'Vaadin', id: 7 },
    { name: 'Micronaut', id: 8 },
    { name: 'Quarkus', id: 9 },
    { name: 'Express', id: 10 },
    { name: 'Nestjs', id: 11 },
    { name: 'Fastify', id: 12 },
    { name: 'Koajs', id: 13 },
    { name: 'Sailsjs', id: 14 },
    { name: 'LoopBack', id: 15 },
    { name: 'Hapijs', id: 16 },
    { name: 'AdonisJS', id: 17 },
    { name: 'Nextjs', id: 18 },
    { name: 'Angular', id: 19 },
    { name: 'Reactjs', id: 20 },
    { name: 'Vite', id: 21 },
    { name: 'Django', id: 22 },
    { name: 'Pyramid', id: 23 },
    { name: 'TurboGears', id: 24 },
    { name: 'Bottle', id: 25 },
    { name: 'CherryPy', id: 26 },
    { name: 'Tornado', id: 27 },
    { name: 'FastAPI', id: 28 },
    { name: 'Sanic', id: 29 },
    { name: 'React-native', id: 30 },
    { name: 'Symfony', id: 31 },
    { name: 'Yii', id: 32 },
    { name: 'Laminas', id: 33 },
    { name: 'Phalcon', id: 34 },
    { name: 'CakePHP', id: 35 },
    { name: 'Slim', id: 36 },
    { name: 'Lumen', id: 37 },
    { name: 'Phalcon', id: 38 },
    { name: 'ASP.NET', id: 39 },
    { name: 'Entity Framework', id: 40 },
    { name: 'NancyFX', id: 41 },
    { name: 'Akka.NET', id: 42 },
    { name: 'Gin', id: 43 },
    { name: 'Echo', id: 44 },
    { name: 'Beego', id: 45 },
    { name: 'Revel', id: 46 },
    { name: 'Fiber', id: 47 },
    { name: 'Buffalo', id: 48 },
    { name: 'Iris', id: 49 },
    { name: 'Gorilla', id: 50 },
    { name: 'Flutter', id: 51 },
    { name: 'AngularDart', id: 52 },
    { name: 'Aqueduct', id: 53 },
    { name: 'Redstone', id: 54 },
    { name: 'Angel', id: 55 },
    { name: 'JavaScript', id: 56 },
    { name: 'TypeScript', id: 57 },
    { name: 'Python', id: 58 },
    { name: 'C#', id: 59 },
    { name: 'C++', id: 60 },
    { name: 'Swift', id: 61 },
    { name: 'Kotlin', id: 62 },
    { name: 'Go', id: 63 },
    { name: 'Ruby', id: 64 },
    { name: 'PHP', id: 65 },
    { name: 'Rust', id: 66 },
    { name: 'Dart', id: 67 },
    { name: 'Scala', id: 68 },
    { name: 'Lua', id: 69 },
    { name: 'Perl', id: 70 },
    { name: 'HTML/CSS', id: 71 },
    { name: 'Vuejs', id: 72 },
    { name: 'Ruby on Rails', id: 73 },
    { name: 'Flask', id: 74 },
    { name: 'Laravel', id: 75 },
    { name: 'Symfony ', id: 76 },
    { name: 'Xamarin', id: 77 },
    { name: 'MongoDB', id: 78 },
    { name: 'MySQL', id: 79 },
    { name: 'PostgreSQL', id: 80 },
    { name: 'SQLite', id: 81 },
    { name: 'Redis', id: 82 },
    { name: 'Oracle Database', id: 83 },
    { name: 'MariaDB', id: 84 },
    { name: 'Cassandra', id: 85 },
    { name: 'Firebase', id: 86 },
    { name: 'Git', id: 87 },
    { name: 'GitHub', id: 88 },
    { name: 'GitLab', id: 89 },
    { name: 'Docker', id: 90 },
    { name: 'Kubernetes', id: 91 },
    { name: 'Jenkins', id: 92 },
    { name: 'Travis CI', id: 93 },
    { name: 'AWS', id: 94 },
    { name: 'Sass', id: 95 },
    { name: 'JUnit', id: 96 },
    { name: 'Jest', id: 97 },
    { name: 'Vitest', id: 98 },
    { name: 'Pytest', id: 99 },
    { name: 'PHPUnit', id: 100 },
    { name: 'Selenium', id: 101 },
    { name: 'Cucumber', id: 102 },
    { name: 'Jasmine', id: 103 },
    { name: 'Nodejs', id: 104 },
  ]

  const [allTechnologies, setAllTechnologies] =
    useState<TechnologiesProps[]>(technologies)

  return (
    <TechnologiesContext.Provider value={{ allTechnologies }}>
      {children}
    </TechnologiesContext.Provider>
  )
}

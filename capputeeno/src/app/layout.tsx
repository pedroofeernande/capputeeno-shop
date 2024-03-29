import { Header } from '@/components/header'
import type { Metadata } from 'next'
import { Saira } from 'next/font/google'
import './globals.css'
import { FilterContextProvider } from '@/contexts/filter-context'


//importa a fonte e definir pesos
const saira = Saira({ 
  weight: ['300', '400', '500','600'],
  subsets: ['latin']

})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

//no classname define a fonte do projeto

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={saira.className}>
        <FilterContextProvider>
        <Header />
        {children}
        </FilterContextProvider>
        
      </body>
    </html>
  )
}

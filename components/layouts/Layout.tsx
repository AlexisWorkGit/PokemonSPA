import { FC, ReactNode, ReactChild, ReactChildren } from "react"
import Head from "next/head"
import { Navbar } from '../ui';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({children, title}) => {
  return (
    <>
        <Head> 
            <title>{ title || 'PokemonApp'}</title>
            <meta name="author" content="Alexis Villegas"></meta>
            <meta name="description" content={`Informacion del Pokemon`}></meta>
            <meta name="keywords" content={`${title}, pokemon, pokedex`}></meta>  </Head>

        <Navbar />

        <main>
            {children}
        </main>
    </>
  )
}

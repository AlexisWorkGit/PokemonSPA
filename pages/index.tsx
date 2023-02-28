import { GetStaticProps } from 'next'
import styles from '@/styles/Home.module.css'
import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import { NextPage } from 'next'
import { Layout } from '../components/layouts/index';
import { pokeApi } from '@/api';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { PokemonRender } from '@/components/pokemons';
import { Pokemon } from '@/interfaces';
import PokemonName from './name/[name]';

interface Props{
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) =>  {
  
 
  return (
      <Layout title={'Algun Pokemon'}>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map(({id, name, img})=>(
           <PokemonRender key={id} id={id} name={name} img={img}/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  const pokemons: SmallPokemon[]=data.results.map((poke,i) =>({
    ...poke,
    id: i+1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`
  })) 
  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/94.svg
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage

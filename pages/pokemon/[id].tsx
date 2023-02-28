import React, { useState } from 'react'
import { GetStaticPaths } from 'next'
import { Layout } from '@/components/layouts'
import { PokemonRender } from '@/components/pokemons';
import { FC } from 'react'
import confetti from 'canvas-confetti'
import { GetStaticProps } from 'next'
import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';
import { Button, Card, Container, Grid, Image, Row, Text } from '@nextui-org/react'
import { localFavorites } from '@/utils';

interface Props{
  pokemon: Pokemon;
}

const Pokemonpage:FC<Props> = ({ pokemon }) => {
  
  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites ( !isInFavorites);
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 170,
      angle: -100,
      origin: { y: 0 , x:1 }
    })
  }

  return (
    <Layout title={pokemon.name}>
        <Text h1 transform='capitalize' css={{padding :'30px'}}>{pokemon.name}</Text>
        <Grid.Container css={{marginTop: '5px'}} gap={2} key={pokemon.id}>
              <Grid xs={12} sm={4}>
                <Card hoverable css={{padding: '30px'}}>
                  <Card.Body>
                    <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} width="100%" height={200}/>
                  </Card.Body>
                </Card>
              </Grid>
              <Grid xs={12} sm={8}>
                <Card>
                  <Card.Header css={{display:'flex', justifyContent: 'space-between'}}>
                    <Text h3 >#{pokemon.id}</Text>
                    <Text h3 transform='capitalize'>#{pokemon.name}</Text>
                    <Button color='gradient' ghost={!isInFavorites} onClick={onToggleFavorite}>
                        { isInFavorites ? 'In favorites' : 'Add to favorites'}
                    </Button>
                    </Card.Header> 
                    <Card.Body>
                      <Text size={30}>
                        Sprites:
                      </Text>
                    <Container display='flex' direction='row'>
                      <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/>
                      <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}/>
                      <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}/>
                      <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}/>
                    </Container>
                    </Card.Body> 
                </Card>
              </Grid>
              <Grid xs={4} sm={2}>
                <Card css={{padding: '30px'}}>
                  <Card.Header>
                  <Text h2 transform='capitalize'>
                      Movimientos:
                      </Text>
                  </Card.Header>
                  <Card.Body>
                  <Container display='flex' direction='column'>
                      {pokemon.moves.slice(0,16).map((move, index) => (
                        <Text key={index} transform='capitalize'>
                          {move.move.name}
                        </Text>
                      ))}
                    </Container>
                    
                  </Card.Body>
                </Card>
              </Grid>
              <Grid xs={12} sm={4}>
                <Card css={{padding: '30px'}}>
                  <Card.Header css={{display:'flex', justifyContent: 'space-between'}}>
                    <Text h2>Caracteristicas</Text>
                    </Card.Header> 
                    <Card.Body> 
                      <Text size={30}>
                        Base Stats:
                        {pokemon.stats.map((stat, index) => (
                        <Text size={20} key={index} transform='capitalize'>
                          {stat.stat.name} : {stat.base_stat}
                        </Text>
                      ))}
                      </Text>
                      <Text size={30}>
                        Experiencia Base: 
                        <Text size={20}>Exp: {pokemon.base_experience}</Text>
                      </Text>
                      <Text size={30}>
                      Altura y Anchura: 
                        <Text size={20}>H-W: {pokemon.height}-{pokemon.weight}</Text>                        
                      </Text>
                    </Card.Body>
                </Card>
              </Grid>
              <Grid xs={12} sm={6}>
              <Card css={{padding:'30px'}}>
                <Text h2>Art-Work Comunidad:</Text>
                      <Card.Body>
                        <Card.Image src={pokemon.sprites.other?.['official-artwork'].front_default || '/no-image.png'} width="100%" height={400}/> 
                      </Card.Body> 
                    </Card>
              </Grid>
        </Grid.Container>
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map((value,index)=> `${index + 1}`);
  return {
    paths: pokemons151.map(id => ( {params: {id}})),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const {id} = params as {id:string}
  const {data} = await pokeApi.get<Pokemon>(`/pokemon/${id}`)
  return {
    props: {
      pokemon: data
    }
  }
}



export default Pokemonpage;

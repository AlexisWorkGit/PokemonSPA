import { Layout } from '@/components/layouts'
import { Pokemon } from '@/interfaces'
import { Text, Grid, Card, Image, Button, Container } from '@nextui-org/react'
import { GetStaticPaths } from 'next'
import { GetStaticProps } from 'next'
import { FC, useState } from 'react'
import { pokeApi } from '@/api';
import { PokemonListResponse } from '../../interfaces/pokemon-list';
import { localFavorites } from '@/utils'
import confetti from 'canvas-confetti'

interface Props {
    pokemon: Pokemon
}

const PokemonName:FC<Props> = ({pokemon}) => {
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
    // <>
    //     <Pokemonpage pokemon={pokemon} />
    // </>
    <Layout transform='capitalize' title='Algun poke'>
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
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonsName151: string[] = data.results.map(pokemon => pokemon.name)
    return {
        paths: pokemonsName151.map(name=> ({params: {name}})),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {name} = params as {name:string}
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = await res.json()
    return {
        props: {
            pokemon
        }
    }
}


export default PokemonName;

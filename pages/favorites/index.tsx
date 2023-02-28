import { Layout } from '@/components/layouts'
import { FavoritePokemon } from '@/components/pokemons';
import { NoFavorites } from '@/components/ui';
import { localFavorites } from '@/utils';
import { Container, Text, Grid, Card } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const pokemonFav = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]) 

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])
  
  return (
    <Layout title='Pokemon Fav'>
        {
          favoritePokemons.length === 0
          ? (<NoFavorites />) : (
              <FavoritePokemon pokemons={favoritePokemons} />

            
            )
        }
    </Layout>
  )
}

export default pokemonFav;
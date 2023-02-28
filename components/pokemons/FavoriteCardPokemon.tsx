import { Grid, Card } from '@nextui-org/react'
import Router, { useRouter } from 'next/router';
import React, { FC } from 'react'

interface Props {
    pokemonId: number;
}

export const FavoriteCardPokemon:FC<Props> = ({pokemonId}) => {
    const router = useRouter();
    
    const onFavoriteClicked = () => {
        router.push(`/pokemon/${pokemonId}`)
    }
    return (
    <Grid xs={6} sm={4} md={3} lg={2} key={pokemonId} onClick={onFavoriteClicked}>
    <Card hoverable clickable css={{padding:10}}>
      <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`} alt={'No hay Fav'} width={250} height={250}></Card.Image> 
    </Card>
    </Grid>
    )
}

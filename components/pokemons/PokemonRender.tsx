import { Button, Card, Grid, Row, Text } from '@nextui-org/react'
import { FC } from 'react'
import { useRouter } from 'next/router'

interface Props{
    id: number,
    name: string,
    img: string,
  }
  

export const PokemonRender:FC<Props> = ({id,name,img}) => {
  
const router = useRouter();

  const onClick = () => {
    router.push(`/pokemon/${id}`)
  }
  
  return (
    <>
            <Grid xs={6} sm={3} md={2} xl={1} key={id}>
              <Card hoverable clickable onClick={onClick}>
                <Card.Body css={{p:1}}>
                  <Card.Image src={img} width="100%" height={140}/>
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-between'>
                    <Text>#{id}</Text>
                    <Text transform='capitalize'>{name}</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
    </>
  )
}

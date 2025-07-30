import { Container } from '@chakra-ui/react'

export default function DefaultLayout({ children }) {
  return (
   <Container className='container'>
        {children}
   </Container>
  )
}

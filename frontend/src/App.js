import React from 'react'
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import HomeScreen from './screens/HomeScreen';



const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
        <h1>Welcome to FestivityFinder</h1>
        <HomeScreen/>
        </Container>
      </main>
      <Footer/>
    </>
  )
}

export default App
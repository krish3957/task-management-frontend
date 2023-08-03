import React from 'react';
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Slider from '../components/slider';


const Container = styled.div`
`

const Home = () => {
    return (
        <Container>
            <Navbar />
            <Slider />

        </Container>
    );
}

export default Home;

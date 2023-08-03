import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';


const Container = styled.div`
    height:100vh;
    width:100%;
    background-image: url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60');
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;



const TextContainer = styled.div`

    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    top:35%;
    left:34%;
`

const Title = styled.h1`
    font-size: 50px;
    z-index: 2;
    color: #000;
`
const Subtitle = styled.h3`
    font-size: 24px;
    color: #000;
    margin-top:-10px
`
const Buttons = styled.div`
    display: flex;
    z-index: 0;
`
const Button = styled.button`
    height: 50px;
    width: 200px;
    margin-left:10px;
    border-radius: 5px;
    font-size: 20px;
    background-color: ${props => props.type === 'filled' ? '#2b35cf' : 'white'};
    color: ${props => props.type === 'filled' ? 'white' : 'black'};
    cursor:pointer;
`

const Slider = () => {
    return (
        <Container>
            <TextContainer>
                <Title>
                    Campus Lost & Found
                </Title>
                <Subtitle>
                    Your Ultimate Task Management Solution
                </Subtitle>
                <Buttons>
                    <Link style={{ textDecoration: "none" }} to={'/items'}>
                        <Button>
                            Your Tasks
                        </Button>
                    </Link>
                    <Link style={{ textDecoration: "none" }} to={'/add'}>
                        <Button type='filled'>
                            Add Task
                        </Button>
                    </Link>
                </Buttons>
            </TextContainer>
        </Container>
    );
}

export default Slider;

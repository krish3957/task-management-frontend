import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/apiCalls";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(255,255,255,0.5),rgba(0,0,0,0.2)) ,url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGFzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60') center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;    
    background-color: white;
     
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

`

const Input = styled.input`
    border-radius: 50px;
    flex: 1;
    border: 1px solid black;
    margin: 20px 10px 0 0 ;
    min-width: 40%;
    padding: 15px;
    background-color: lightgrey;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
    text-align: center;
`



const Button = styled.button`
    margin-top: 30px;
    width: 30%;
    padding: 15px 0;
    cursor: pointer;
    :disabled{
        background-color: grey;
        cursor: not-allowed;
    }    
`
const Link = styled.a`
    margin-right: 20px;
    cursor: pointer;
    text-decoration: underline;
`
const Error = styled.span`
    color: red;
`

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { isFetching, error } = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault();
        console.log(username,password);
        login(dispatch, { username, password });
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                    {error && <Error >Something Went Wrong!!!</Error>}
                </Form>
                
                <Link>FORGOT PASSWORD?</Link>
                <Link>CREATE AN ACCOUNT</Link>
            </Wrapper>
        </Container>
    );
}

export default Login;

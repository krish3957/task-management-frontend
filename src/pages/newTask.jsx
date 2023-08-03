import React, { useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const Container = styled.div`
    top:70px;
    height: 90vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url('https://images.unsplash.com/photo-1617785899222-fe06b15b6dd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80');
    background-size: cover;
`

const Wrapper = styled.div`
    display: flex;
    height: 70vh;
    width: calc(30vw + 30px);
    align-self: center;
    flex-direction: column;
    padding: 20px;
    background-color: #ececec;
`
const Title = styled.h2`
    font-weight: 400;
`




const Input = styled.input`
    --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  width: 30vw;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
  margin-bottom: 10px;
  ::placeholder{
    color: var(--font-color-sub);
    opacity: 0.8;
  };
  :focus{
    border: 2px solid var(--input-focus);
  };
    
`

const Date = styled.input`
    margin-top: 10px;
    --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  width: 15vw;
  height: 30px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 2px;
  outline: none;
  margin-bottom: 10px;
  ::placeholder{
    color: var(--font-color-sub);
    opacity: 0.8;
  };
  :focus{
    border: 2px solid var(--input-focus);
  };
`



const Select = styled.select`
  --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  width: calc(31vw + 10px);
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
  margin-bottom: 10px;
  ::placeholder{
    color: var(--font-color-sub);
    opacity: 0.8;
  };
  :focus{
    border: 2px solid var(--input-focus);
  };
`

const Option = styled.option`

`


const Button = styled.button`
    padding:10px;
    font-weight: 300;
    font-size: 18px;
    width: 200px;
    background-color: white;
    border-radius: 5px;
`
const SpinnerContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 90vh;
    z-index: ${props => props.hidden === true ? -9 : 9};
    background-color: white;
    opacity:0.8;
`

const Spinner = styled.div`
    opacity: 1;
    --size: 30px;
    --first-block-clr: #005bba;
    --second-block-clr: #fed500;
    --clr: #111;
    width: 100px;
    height: 100px;
    z-index: ${props => props.hidden === true ? -10 : 10};
    position: relative;
    &::after,&::before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    width: var(--size);
    height: var(--size);
    top: 50%;
    animation: up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    left: 50%;
    background: var(--first-block-clr);
    } 
    &::after {
    background: var(--second-block-clr);
    top: calc(50% - var(--size));
    left: calc(50% - var(--size));
    animation: down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
    }  
        @keyframes down {
    0%, 100% {
    transform: none;
    }

    25% {
    transform: translateX(100%);
    }

    50% {
    transform: translateX(100%) translateY(100%);
    }

    75% {
    transform: translateY(100%);
    }
    }

    @keyframes up {
    0%, 100% {
    transform: none;
    }

    25% {
    transform: translateX(-100%);
    }

    50% {
    transform: translateX(-100%) translateY(-100%);
    }

    75% {
    transform: translateY(-100%);
    }
    }

`

const NewTask = () => {
    const User = useSelector(state=>state.user.currentUser);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({ priority: 1 });

    const handleChange = (e) => {
        if (e.target.name === 'priority') {
            if (e.target.value === "High") {
                setInput((prev) => {
                    return { ...prev, [e.target.name]: 1 };
                });
            }
            else if (e.target.value === "Medium") {
                setInput((prev) => {
                    return { ...prev, [e.target.name]: 2 };
                });
            }
            else if (e.target.value === "Low") {
                setInput((prev) => {
                    return { ...prev, [e.target.name]: 3 };
                });
            }
        }
        else {
            setInput((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        }
    };
    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('http://localhost:5000/api/tasks', {
            task: input.task,
            desc: input.desc,
            deadline:input.deadline,
            priority:input.priority,
            userId:User._id
            
        }).then(result => {
            setLoading(false);
            navigate('/tasks/' + User._id);
        })
        setLoading(false);
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>
                        Add a new Item
                    </Title>
                    <Input placeholder='Enter name of the task' name='task' onChange={handleChange} required />
                    <Input placeholder='Describe the found Item' name='desc' onChange={handleChange} required />
                    <Select name='priority' onChange={handleChange}>
                        <Option>High</Option>
                        <Option>Medium</Option>
                        <Option>Low</Option>
                    </Select>
                    <Date type='date' name='deadline' onChange={handleChange} />
                    <Button disabled={loading} onClick={handleClick}>
                        Add Item
                    </Button>
                </Wrapper>
                <SpinnerContainer hidden={!loading}>
                    <Spinner hidden={!loading}></Spinner>
                </SpinnerContainer>
            </Container>
        </div>
    );

}

export default NewTask;





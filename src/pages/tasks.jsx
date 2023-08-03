import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { styled } from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';

const Container = styled.div`
    width: 99vw;
    background-color: black;
`
const Wrapper = styled.div`
    min-height: 91vh;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    position: relative;
    top: 70px;
    display: flex;
    width: calc(83vw - 0.5px);
    
    
`

const Left = styled.div`
    height: 91vh;
    background-color: black;
    flex:1;
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 16vw;
`
const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    position: relative;
    left: 16vw;
    background-color: #ececec;
    flex:5;
`

const SearchContainer = styled.div`
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: space-between;
    text-align: center;
`

const SearchInput = styled.input`
    font-family: inherit;
  font-size: inherit;
  background-color: #f4f2f2;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 12em;
  transition: all ease-in-out .5s;
    margin-top: 10px;

`

const Svg = styled.svg`
    margin: 0 0 -10px -30px ;
    height:20px;
    width:20px;
    opacity: 0.5;
    
`
const SubTitle = styled.h3`
    margin-left:15px;
    color: white;
    font-size: 24px;
    font-weight: 300;
`

const CheckBox = styled.input`
    margin-left:15px;
    align-self: flex-start;
    width: 20px;
    height: 20px;
    border: 2px solid #30cfd0;
    border-radius: 5px;
    background-color: transparent;
    display: inline-block;
    position: relative;
    margin-right: 10px;
  cursor: pointer;
`

const RightWrapper = styled.div`
    width: 35vw;
    height: auto;
    background: white;
    border-radius: 10px;
    transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(190, 190, 190),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
`

const Label = styled.label`
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
`


const Link = styled.a`
    color: black;
    text-decoration: none;
`

const Option = styled.option`
    width:50px;
`

const Select = styled.select`
    width: 100px;
    margin-left: 20px;
    height:20px;
`
const Comleted = styled.div`
    background-color: orange;
    color: white;
    width:70px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    border-radius: 5px;
    
`
const Delete = styled.button`
    background-color: orange;
    color: white;
    width:70px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    bottom:10px;
    border-radius: 5px;
    
`
const Book = styled.div`
    position: relative;
  border-radius: 10px;
  width: 100%;
  height: 150px;
  background-color: whitesmoke;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  padding-left: 10px;
  align-items: start;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: start;
  color: #000;
  margin:10px 0;
`
const Heading = styled.h3`
`

const P = styled.p`
    margin:5px 0;
`

const Tasks = () => {
    const User = useSelector(state=>state.user.currentUser);
    const [loading,setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [priority, setPriority] = useState([]);
    const [sort, setSort] = useState("priority")
    const [completed, setCompleted] = useState(false);
    const handleCompleted = (({ currentTarget: input }) => {
        setCompleted(input.value);
    });
    useEffect(() => {
        const getItems = () => {
            const url = `http://localhost:5000/api/tasks/${User._id}?completed=${completed}&priority=${priority}&sort=${sort}`;
            axios.get(url).then(result => {
                setItems(result.data.task);
                console.log(result.data);
            });
        }
        getItems();
    }, [completed, priority, sort, User]);

    const handleChange = (({ currentTarget: input }) => {
        if (input.checked) {
            const state = [...priority, input.value];
            setPriority(state);

        }
        else {
            const state = priority.filter((val) => val !== input.value);
            setPriority(state);

        }
    });

    const hadndleSort = (e) => {
        setSort(e.target.value);
    }
    const priorityOptions = ["none", "High", "Medium", "Low"];

    const handleDelete = (e) =>{
        try {
            setLoading(true);
            const id = e.target.getAttribute("data-value")
            axios.delete("http://localhost:5000/api/tasks/" + id);
            console.log('deleted');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Left>
                    <SubTitle>Filter By Priority:</SubTitle>

                    <Label>
                        <CheckBox type="checkbox" onChange={handleChange} value={1} />
                        High</Label>
                    <Label>
                        <CheckBox type="checkbox" onChange={handleChange} value={2} />
                        Medium</Label>
                    <Label>
                        <CheckBox type="checkbox" onChange={handleChange} value={1} />
                        High</Label>


                    <SubTitle>Filter By:</SubTitle>
                    <Select onChange={handleCompleted}>
                        <Option value="All">
                            All
                        </Option>
                        <Option value={true} selected>
                            Completed
                        </Option>
                        <Option value={false}>
                            Not Completed
                        </Option>
                    </Select>
                    <SubTitle>Sort By:</SubTitle>
                    <Select onChange={hadndleSort}>
                        <Option value="Priority" selected>
                            Priority
                        </Option>
                        <Option value="deadline">
                            Deadline
                        </Option>
                        <Option value="createdAt">
                            Create Date
                        </Option>
                    </Select>
                </Left>
                <Right>
                    <RightWrapper>
                        {items.map((item, index) => (
                            <Book>
                                <Heading>Task: {item.task}</Heading>
                                <P>{item.desc}</P>                                
                                <P>Priority: {priorityOptions[item.priority]}</P>
                                <P>Deadline:{dateFormat(item.deadline,'dd/mm/yyyy')}</P>
                                {item.completed && <Comleted>Completed</Comleted>}    
                                <Delete data-value={item._id} onClick={handleDelete}>delete</Delete>
                                <Link href = {'/item/' + item._id}></Link>
                            </Book>
                        ))}
                    </RightWrapper>
                </Right>
                {loading && <Heading>loading</Heading>}
            </Wrapper>
        </Container>
    )
}

export default Tasks;

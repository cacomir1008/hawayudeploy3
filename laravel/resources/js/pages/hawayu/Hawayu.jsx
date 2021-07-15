import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory,useLocation} from 'react-router-dom';

import {
    IconButton,Button,ButtonGroup,Box,ChakraProvider,Badge,
    FormControl,FormLabel,
    Container,Select,Image,Center
  } from "@chakra-ui/react"
import { ArrowRightIcon,ArrowBackIcon } from '@chakra-ui/icons'

import question1 from './question1.png';
import question2 from './question2.png';
import question3 from './question3.png';
import question4 from './question4.png';
import { valuesIn } from 'lodash';


const Hawayu = () =>{
    const history = useHistory();
    const location = useLocation();
    const  [question, setQuestion] = useState([]);
    const  [answerData, setAnswerData] = useState([]);

    const pictures = [question1,question2,question3,question4]

    const api_token = document
        .querySelector('meta[name="api-token"]')
        .getAttribute("content")

    const csrf_token = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content")
        
    // const onClickCreateQuestion = async() =>{
    //     await axios.post("/api/create-inquiry",{api_token},{csrf_token})
    // .then((res)=>{
    //     console.log("create",res.data)   
    //     onClickShowQuestion();
    //      })     
    // .catch(error => {
    //              console.log('Error',error.response);
    //                  });
    //         }

    useEffect(() => {
        onClickShowQuestion()
        console.log(location.state)
        const inquiry_Id = location.state
        console.log(inquiry_Id)
    },[])

    const onClickShowQuestion = async() =>{
                await axios.get("/api/show-question",{api_token},{csrf_token})
                .then((res)=>{   
                    setQuestion(res.data)
                    console.log(res.data)
                 
                    }
                        ) 
                .catch(error => {
                             console.log('Error',error.response);
                                 });
                        }  
              
　　//質問ごとの回答をsetStateする
    const onChangeSetData = (e) =>{
        e.preventDefault();
        //questionID：answerID
        setAnswerData([...answerData,(JSON.stringify({[e.target.name]:e.target.value}))])
    }

    //更新部分：送信する関数（回答内容とハワユidを付与）
    // エンドポイントはdeploy時に本番URLに変える必要あり
    const onClickSubmit = async() =>{
       await axios.post('http://localhost/api/answer-inquiry',{
        answer: answer,
        inquiry_id: inquiry_id,
        api_token:api_token
    }).then(alert("送信しました"))
    }
        return(
            <>
            <ChakraProvider>
                <ButtonGroup size="sm" isAttached variant="outline" onClick ={()=>history.goBack()}>
                    <IconButton aria-label="back" icon={<ArrowBackIcon />} />
                    <Button mr="-px">戻る</Button>  
                </ButtonGroup>
            </ChakraProvider>
        
            <ChakraProvider>
            {question.map((q) =>
                                       <Container key={q.id} maxW="xl" centerContent >
                                       <ul>
                                       <FormLabel>                     
                                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                              {q.id}
                                            </Badge>
                                        </FormLabel>
                                        <Box width="30%" height="30%">
                                        <Image
                                        
                                            objectFit="cover"
                                            src={pictures[(q.id)-1]}
                                        />
                                        </Box>
                                       {q.question}
                                       <Select placeholder="回答を選ぶ" 
                                       name={"A"+q.id}
                                       onChange={ onChangeSetData }>
                                            {q.answers.map((a)=>
                                            <option value={a.id} key={a.id}>{a.answer}</option> 
                                            )}
                                      </Select>
                                      </ul> 
            
                                        </Container>
                                    )}
                                                               
                                         <Center>
                                             <Button leftIcon={<ArrowRightIcon />} 
                                                onClick={onClickSubmit}
                                                bg="#FFE3D3" size="sm">
                                                    送信する
                                             </Button>
                                        </Center>

                                        
                 </ChakraProvider>

            </>
        )

    }

export default Hawayu;
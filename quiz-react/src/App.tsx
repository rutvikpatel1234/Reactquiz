import React, {useState} from 'react';
import QuestionCard from './comp/QuestionCard';
import { fetchQuizQuestions } from './API';
import {QuestionsState, Difficulty} from './API';
import {GlobalStyle, Wrapper} from './App.style';
import LodingImg from './img/loding.gif';

export type AnswerObject={
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTION = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const[number, setNumber] = useState(0);
  const[userAns, setUserAns] = useState<AnswerObject[]>([]);
  const[score, setScore] = useState(0);
  const[gameover, setGameOver] = useState(true);
  console.log(questions);
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAns([]);
    setNumber(0);
    setLoading(false);
};

function checkAnswer (e:React.MouseEvent<HTMLButtonElement>){
  if(!gameover){
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if(correct) setScore(prev => prev + 1)
    const ansObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
      
    };
    setUserAns((prev) => [...prev, ansObject]);
  }
}

function nextQuestion(){
  const nextQuestion = number + 1;
  if(nextQuestion === TOTAL_QUESTION){
    setGameOver(true);
  }else{
    setNumber(nextQuestion);
  }

}


  return (
    <>
    <GlobalStyle />
    <Wrapper>
  
      <h1>React Quiz</h1>
      {gameover || userAns.length === TOTAL_QUESTION ? (
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      ) : null}
      {!gameover ? <p className="score">Score:{score}</p>: null}
      {loading && <img src={LodingImg}/>}
      {!loading && !gameover && (
      <QuestionCard
        quesNr={number + 1}
        totalQues = {TOTAL_QUESTION}
        question={questions[number].question}
        answers={questions[number].answers}
        userAns = {userAns ? userAns[number] : undefined}
        callback = {checkAnswer}
      />)}
      {!gameover && !loading && userAns.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
      <button className="next" onClick={nextQuestion}>Next Question</button>

      ) : null}

      </Wrapper>
  </>
  );
}

export default App;

import React from 'react';
import {AnswerObject} from "../App";
import{ Wrapper,ButtonWrapper} from './QC.Style';
type Props = {
    question: string;
    answers: string[];
    callback: (e:React.MouseEvent<HTMLButtonElement>) => void;
    userAns: AnswerObject | undefined;
    quesNr: number;
    totalQues: number;
}


const QustionCard: React.FC<Props>= ({question,answers,callback,userAns,quesNr,totalQues}) =>(
<Wrapper>
    <p className="number">
        Question: {quesNr} / {totalQues}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}} />
    <div>
        {answers.map(answer => (
            <ButtonWrapper 
            key={answer}
            correct={userAns?.correctAnswer === answer}
            userClicked={userAns?.answer === answer}>
                <button disabled={!!userAns} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}} />
                </button>
            </ButtonWrapper>
        ))}
    </div>
</Wrapper>
);

export default QustionCard;
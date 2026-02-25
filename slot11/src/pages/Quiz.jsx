import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { quizData } from '../data/questions';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerOptionClick = () => {
        if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer('');
        } else {
            setShowScore(true);
        }
    };

    if (showScore) {
        return (
            <Container className="mt-5 text-center">
                <Card className="p-5 shadow border-0">
                    <h1 className="text-danger fw-bold">Quiz Completed!</h1>
                    <p className="fs-4 mt-3">Your score: <span className="fw-bold text-primary">{score}</span> / {quizData.length}</p>
                    <div className="mt-4">
                        <Button variant="danger" className="px-5 py-2" onClick={() => window.location.reload()}>Làm lại</Button>
                    </div>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1 className="text-danger fw-bold mb-4">Question {currentQuestion + 1}</h1>
            <Card className="p-4 shadow-sm border-0">
                <p className="fs-5 fw-bold mb-4">{quizData[currentQuestion].question}</p>
                <Form>
                    {quizData[currentQuestion].answers.map((answer, index) => (
                        <Form.Check 
                            key={index}
                            type="radio"
                            label={answer}
                            name="quiz-answer"
                            id={`answer-${index}`}
                            className="mb-3 border p-3 rounded shadow-sm hover-select"
                            checked={selectedAnswer === answer}
                            onChange={() => setSelectedAnswer(answer)}
                        />
                    ))}
                </Form>
                <div className="d-flex mt-4">
                    <Button 
                        variant="danger" 
                        className="px-5 py-2 fw-bold" 
                        onClick={handleAnswerOptionClick}
                        disabled={!selectedAnswer}
                    >
                        {currentQuestion === quizData.length - 1 ? "Finish" : "Next"}
                    </Button>
                </div>
            </Card>
        </Container>
    );
};

export default Quiz;
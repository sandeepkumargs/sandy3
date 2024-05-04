# go-quiz-services
go-quiz-micro services

There are three types of quizzes

1) Simple Quiz
-------------------
* Defintion : A Simple Quiz is a quiz which is based on one subject matter. e.g. Javascript
* A Simple Quiz will display a question and then when you answer the question, the right answer
will be displayed immediately.
* A Simple Quiz will have 1 mark and will add that to your profile 
* - Beginner (5)
* - Novice (10)
* - Jockey (25), 
* - Manja (50),
* - Ninja (100),
* - Expert(200)
* - Pro (500)

2) Evaluation Quiz
-------------------
* Definition - An Evaluation quiz shall always be attached to a module in a course.
* An evaluation quiz shall evaluate how much you have understood on a particular topic in a subject.
* In an evaluation quiz, we will not show the right/wrong answers immediately. We will only display the results of the quiz at the end of the quiz , i.e after answering all the questions. This is to make sure that the person taking the quiz should madatorily complete the quiz

* Once the quiz is fully submitted, then the quiz walks the user with answers and explanations for all the questions, one by one

3) Timer based Quiz
--------------------
This is exactly like an evaluation quiz, but with a timer to complete the overall questions.
- The quiz will be evaluated with the no. of questions answered within the stipulated time


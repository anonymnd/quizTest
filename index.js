var questions = ['question 1', 'question 2', 'question 3','question 4'];
var options = [
    ['a1', 'b1', 'c1', 'd1'], ['a2', 'b2', 'c2', 'd2'], ['a3', 'b3', 'c3', 'd3'] ,  ['a4', 'b4', 'c4', 'd4']
]
var fstClik = true;
var score = 0;
var answers = ['b1', 'c2', 'd3','c4'];
var counter = 0;
const buttonEL = document.querySelector(".next");
const ulEL = document.querySelector(".affirmation");
const startbuttonEL = document.querySelector(".start");
const scoreDiv = document.querySelector(".quiz");

buttonEL.disabled = true;


//questions display
function questionsLoop(counter) {
    ulEL.innerHTML = "";

    for (var i = counter; i < questions.length; i++) {

        const liELOption = document.createElement('LI');
        liELOption.classList.toggle("answer");
        ulEL.appendChild(liELOption);
        liELOption.innerHTML = questions[i];
        for (var j = 0; j < 4; j++) {
            const liELOption = document.createElement('LI');
            liELOption.innerHTML = options[i][j];
            ulEL.appendChild(liELOption);
        }
        break;
    }
}
//next button event listener
buttonEL.addEventListener("click", () => {

    if (counter != questions.length) {
        checkRightAnswer(answers[counter]);
        questionsLoop(counter);
        counter++;
        ulEL.addEventListener("click", ulEventListener); // Reattach the event listener
        fstClik = false;
    } else {
        youScore();
        buttonEL.disabled = true;
        counter = 0;
        startbuttonEL.disabled = false;
    }


})

//start button event listener
startbuttonEL.addEventListener("click", () => {
    score = 0;
    scoreDiv.innerHTML = "";
    ulEL.addEventListener("click", ulEventListener);
    questionsLoop(counter);
    buttonEL.disabled = false;
    startbuttonEL.disabled = true;
    counter++;
})
//ul tag event listener callback
function ulEventListener(e) {
    if (e.target.tagName === 'LI') {
        if (e.target.innerHTML === answers[counter - 1]) {
            e.target.classList.toggle("correct");
            score++;
        } else {
            checkRightAnswer(answers[counter - 1])
            e.target.classList.toggle("incorrect");
        }
        ulEL.removeEventListener("click", ulEventListener);

    }
}
//check right answer from options based on answer and ul childrens
function checkRightAnswer(answer) {
    for (var j = 0; j < 4; j++) {
        if (ulEL.children[j].innerHTML === answer) {
            ulEL.children[j].classList.toggle("correct");
        }
    }
}

function youScore() {
    ulEL.innerHTML = "";
    let createParagraph = document.createElement("p");
    scoreDiv.appendChild(createParagraph);
    createParagraph.textContent = `Your score is ${score}/${questions.length}`;

}


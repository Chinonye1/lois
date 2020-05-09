const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})



function startGame() {
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() => Math.random() - .5)
	currentQuestionIndex = 0
	setNextQuestion()
	

}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])

}

function answerTracker(){
	for(let i=0; i<questions.length; i++){
		const div=document.createElement('div')
		answerTrackerContainer.appendChild(div)
	}
}

function showQuestion(question) {
	questionElement.innerText = question.question
	question.answers.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
	nextButton.classList.remove('hide')

}

function resetState() {
	clearStatusClass(document.body)
	nextButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button,button.dataset.correct)
	})
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	} else {
		startButton.innerText = 'Restart'
		startButton.classList.remove('hide')
	}

}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if (correct) {
		element.classList.add('correct')
	} else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}

const questions = [
  {
  	question: 'A nucleotide is made up of the following basic units except?',
  	answers: [
      { text: 'Phosphoric acid', correct: false},
      { text: 'Genomes', correct: true},
      { text: 'Pentose sugar', correct: false}
  	]
  },
  {
  	question: 'The first process between DNA and mRNA is?',
  	answer: [
      { text: 'Transcription', correct: true},
      { text: 'Translation', correct: false},
      { text: 'Transduction', correct: false}
  	]
  },
  {
  	question: 'The organelle that is responsible for cellular respiration is?',
  	answer: [
      { text: 'Ribosome', correct: false},
      { text: 'Lumen', correct: false},
      { text: 'Mitochondria', correct: true}
  	]
  },
  {
  	question: 'The fluid inside the chloroplast is called?',
  	answer: [
      { text: 'Stroma', correct: true},
      { text: 'Cell fluid', correct: false},
      { text: 'Lumen', correct: false}
  	]
  },
  {
  	question: 'The change of biological communities over time is known as?',
  	answer: [
      { text: 'Ecological succession', correct: true},
      { text: 'Growth', correct: false},
      { text: 'Specie development', correct: false}
  	]
  }
]
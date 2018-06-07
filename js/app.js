var suspects = null;
var json = null
var inspector = null;
var counter = 0;
var answerId = 0;
var questions = null;
var answers = null;
var img = null;
var thread = "";
var theme = document.getElementById("audioTheme");
theme.volume = 0.1;
theme.play();

var $questions_container = document.querySelector('.history-questions');
var $img_container = document.querySelector('.history-imgSuspect');
var $dial_container = document.querySelector('.history-dialogues');
var $history_container = document.querySelector('.history');


pageRequest('../dialog.json');

function pageRequest(url) {
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        return;
      }

      return response.json();
    })
    .then((data) => {
      suspects = Object.keys(data).filter((key) => key !== 'Inspector');

      inspector = data.Inspector;

      json = data

      render();
    });
}

function render(hints) {
  questions = inspector[suspects[counter]];
  answers = json[suspects[counter]].answer;
  img = json[suspects[counter]].img;
  $questions_container.innerHTML = '';
  $img_container.setAttribute('src', img);
  if (!answers[answerId].question) {
    counter++;
    if (counter > suspects.length - 1) {
      counter = suspects.length - 1;
      $img_container.remove();
      $history_container.innerHTML += '<a class="history-changeSuspect" href="fin.html">Rapport de l\'enquete </a>';
      $dial_container.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: $dial_container.scrollHeight,
      });
      return;
    }
    answerId = 0;
    render();

    $dial_container.innerHTML += '<h2 class="history-suspectName">' + suspects[counter] + '</h2>';
    renderSuspectSentence();
    return;
  }
  answers[answerId].question.forEach((element) => {
    var text = questions.find((question) => question.id === element);
    var button = document.createElement('button');
    button.className = 'question';
    button.dataset.askId = text.id;
    button.dataset.answerId = text['id-answer'];
    button.textContent = text.text;
    button.addEventListener('click', function () {
      answerId = this.dataset.answerId - 1;
      if (text.id < questions.length + 1) {
        renderInspectorSentence(this);
        renderSuspectSentence(this);
      }
      render();
      $dial_container.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: $dial_container.scrollHeight,
      });
    });
    $questions_container.appendChild(button);
  });

  if (counter === 0 && answerId === 0) {
    renderSuspectSentence();
  }

}

function renderSuspectSentence(button) {
  var suspectSentenceContainer = document.createElement('div');
  suspectSentenceContainer.className = 'dialogue-suspect';
  suspectSentenceContainer.style.background = json[suspects[counter]].color;
  var suspectSentence = document.createElement('p');
  suspectSentence.textContent = answers[(button) ? button.dataset.answerId - 1 : 0].text;
  suspectSentenceContainer.appendChild(suspectSentence);
  $dial_container.appendChild(suspectSentenceContainer);
}

function renderInspectorSentence(button) {
  var inspectorSentenceContainer = document.createElement('div');
  inspectorSentenceContainer.className = 'dialogue-inspector';
  var inspectorSentence = document.createElement('p');
  inspectorSentence.textContent = questions[button.dataset.askId - 1].text;
  inspectorSentenceContainer.appendChild(inspectorSentence);
  $dial_container.appendChild(inspectorSentenceContainer);
}
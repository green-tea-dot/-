let quizData = [];
let currentIndex = 0;

async function loadQuizData() {
  const res1 = await fetch('quiz_part1.json');
  const res2 = await fetch('quiz_part2.json');
  const data1 = await res1.json();
  const data2 = await res2.json();
  quizData = [...data1, ...data2];
  showQuestion();
}

function showQuestion() {
  const q = quizData[currentIndex];
  document.getElementById('question').textContent = `${currentIndex + 1}. ${q.word}`;
  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === q.correct) {
        alert('✅ 正解！');
      } else {
        alert(`❌ 不正解… 正解は「${q.correct}」です`);
      }
    };
    choicesDiv.appendChild(btn);
  });
}

document.getElementById('next').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    alert('🎉 クイズ終了！お疲れさまでした！');
  }
});

loadQuizData();

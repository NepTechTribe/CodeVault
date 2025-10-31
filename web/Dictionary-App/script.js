const wordInput = document.getElementById('word-input');
const searchBtn = document.getElementById('search-btn');
const result = document.querySelector('.result');
const loading = document.querySelector('.loading');
const errorMsg = document.querySelector('.error-msg');
const wordEl = document.querySelector('.word');
const phoneticEl = document.querySelector('.phonetic');
const meaningsEl = document.querySelector('.meanings');
const audioBtn = document.getElementById('audio-btn');
let audio;

async function searchWord(word) {
  if (!word.trim()) return;

  result.classList.add('hidden');
  errorMsg.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error();

    const data = await res.json();
    const entry = data[0];

    wordEl.textContent = entry.word;
    phoneticEl.textContent = entry.phonetic || '—';

    const audioUrl = entry.phonetics.find(p => p.audio)?.audio;
    if (audioUrl) {
      audio = new Audio(audioUrl);
      audioBtn.onclick = () => audio.play();
      audioBtn.classList.remove('opacity-50');
    } else {
      audioBtn.classList.add('opacity-50');
      audioBtn.onclick = null;
    }

    meaningsEl.innerHTML = '';
    entry.meanings.forEach(m => {
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
          <p class="font-semibold text-purple-700 dark:text-purple-400">${m.partOfSpeech}</p>
          <ul class="mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
            ${m.definitions.slice(0, 3).map(d => `<li>${d.definition}</li>`).join('')}
          </ul>
          ${m.synonyms.length ? `<p class="mt-2 text-sm text-pink-600 dark:text-pink-400">Synonyms: ${m.synonyms.slice(0, 5).join(', ')}</p>` : ''}
        </div>
      `;
      meaningsEl.appendChild(div);
    });

    loading.classList.add('hidden');
    result.classList.remove('hidden');

  } catch (err) {
    loading.classList.add('hidden');
    errorMsg.classList.remove('hidden');
  }
}

searchBtn.addEventListener('click', () => searchWord(wordInput.value));
wordInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchWord(wordInput.value);
});

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  document.getElementById('theme-toggle').textContent = isDark ? 'Light Mode' : 'Dark Mode';
});

window.addEventListener('load', () => {
  wordInput.value = 'hello';
  searchWord('hello');
});
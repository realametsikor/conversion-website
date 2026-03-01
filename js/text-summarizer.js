const input = document.getElementById('summary-input');
const output = document.getElementById('summary-output');
const lengthSelect = document.getElementById('summary-length');
const summarizeBtn = document.getElementById('summary-btn');

const splitSentences = (text) => {
    return text
        .replace(/\s+/g, ' ')
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);
};

const summarize = () => {
    const text = input.value.trim();
    if (!text) {
        output.textContent = 'Add some text to summarize.';
        return;
    }

    const sentences = splitSentences(text);
    if (!sentences.length) {
        output.textContent = 'No sentences detected. Add punctuation to help summarize.';
        return;
    }

    const target = Number(lengthSelect.value) || 3;
    const ranked = [...sentences]
        .map((sentence) => ({
            sentence,
            score: sentence.length + (sentence.includes(',') ? 5 : 0)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, target)
        .map((item) => item.sentence);

    output.textContent = ranked.join(' ');
};

summarizeBtn.addEventListener('click', summarize);

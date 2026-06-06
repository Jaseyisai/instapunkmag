import { useState, useEffect } from "react";

const DEFAULT_QUESTIONS = [
  {
    question: "What kind of show are you most likely to attend?",
    options: [
      { label: "A political punk rally with chants and DIY zines", type: "anarcho" },
      { label: "A classic basement set with raw melodies", type: "classic" },
      { label: "A riot grrrl all-female bill with handmade merch", type: "riot" },
      { label: "A hardcore slam-dance pit with sweat and speed", type: "hardcore" },
    ],
  },
  {
    question: "What would you write on the back of your jacket?",
    options: [
      { label: "Smash the system", type: "anarcho" },
      { label: "Loud, proud, no regrets", type: "classic" },
      { label: "Girls to the front", type: "riot" },
      { label: "Break the set, leave everything", type: "hardcore" },
    ],
  },
  {
    question: "Which DIY project sounds the most like you?",
    options: [
      { label: "Printing zines and dropping flyers", type: "anarcho" },
      { label: "Distressing a vintage band tee", type: "classic" },
      { label: "Sewing patches and safety pin art", type: "riot" },
      { label: "Spiking boots and customizing gear", type: "hardcore" },
    ],
  },
  {
    question: "How do you describe your energy?",
    options: [
      { label: "Angry, idealistic, and disruptive", type: "anarcho" },
      { label: "Rebellious with a sense of heritage", type: "classic" },
      { label: "Fierce, empathetic, and loud", type: "riot" },
      { label: "Fast, heavy, and unfiltered", type: "hardcore" },
    ],
  },
];

const DEFAULT_RESULTS = {
  anarcho: {
    title: "Anarcho Punk",
    description: "You are the voice of the streets: DIY, political, and ready to start a movement. Your punk is a protest, not a fashion statement.",
  },
  classic: {
    title: "Classic Punk",
    description: "You carry the original punk spirit: loud, defiant, and rooted in the early scene. You respect the icons and keep the attitude alive.",
  },
  riot: {
    title: "Riot Grrrl",
    description: "You are raw, radical, and fiercely inclusive. Your punk is personal, empowered, and all about community and change.",
  },
  hardcore: {
    title: "Hardcore Punk",
    description: "You live fast and burn bright. Your punk is intense, physical, and built for the pit — no compromises, only sweat and truth.",
  },
};

const DEFAULT_POLL_COUNTS = {
  anarcho: 26,
  classic: 22,
  riot: 31,
  hardcore: 21,
};

export default function PunkTypeQuiz({
  title = "// WHAT TYPE OF PUNK ARE YOU? //",
  intro = "Answer four quick questions and discover your punk archetype. Then compare yourself to the site poll.",
  questions = DEFAULT_QUESTIONS,
  results = DEFAULT_RESULTS,
  storageKey = "punkTypeQuizPollCounts",
  initialCounts = DEFAULT_POLL_COUNTS,
  panelLabel = "Most popular punk type today",
  pollHeading = "Community poll snapshot",
  panelCopy = "Votes are live. See which punk type the community is leaning toward before you answer.",
}) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const [pollCounts, setPollCounts] = useState(initialCounts);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setPollCounts(JSON.parse(stored));
      }
    } catch (error) {
      console.warn("Failed to load poll counts", error);
    }
  }, [storageKey]);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
    setResult(null);
  }, [questions]);

  const allAnswered = answers.every(Boolean);

  const selectAnswer = (questionIndex, type) => {
    const next = [...answers];
    next[questionIndex] = type;
    setAnswers(next);
  };

  const submitQuiz = () => {
    if (!allAnswered) return;

    const tally = answers.reduce((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {});

    const winner = Object.keys(tally).reduce(
      (best, current) => (tally[current] > tally[best] ? current : best),
      Object.keys(tally)[0]
    );

    setResult(results[winner] || { title: winner, description: "You have a unique punk profile." });
    setPollCounts(prevCounts => {
      const nextCounts = { ...prevCounts, [winner]: (prevCounts[winner] || 0) + 1 };
      try {
        localStorage.setItem(storageKey, JSON.stringify(nextCounts));
      } catch (error) {
        console.warn("Failed to save poll counts", error);
      }
      return nextCounts;
    });
  };

  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(null));
    setResult(null);
  };

  const pollTotal = Object.values(pollCounts).reduce((total, count) => total + count, 0);
  const pollData = Object.entries(pollCounts).map(([type, count]) => ({
    label: results[type]?.title || type,
    count,
    value: pollTotal ? Math.round((count / pollTotal) * 100) : 0,
  }));
  const topPoll = pollData.reduce((best, item) => (item.count > best.count ? item : best), pollData[0] || { label: "None", count: 0, value: 0 });

  return (
    <div className="quiz-card">
      <div className="quiz-headline">{title}</div>
      <div className="quiz-copy">{intro}</div>

      <div className="quiz-panel">
        <div className="quiz-panel-label">{panelLabel}</div>
        <div className="quiz-panel-value">{topPoll.label}</div>
        <div className="quiz-panel-copy">{panelCopy}</div>
      </div>

      <div className="quiz-poll-summary">
        <div className="quiz-poll-title">{pollHeading}</div>
        <div className="quiz-copy">Total votes: {pollTotal}</div>
        <div className="quiz-poll">
          {pollData.map(item => (
            <div key={item.label} className="poll-row">
              <span className="poll-label">{item.label}</span>
              <div className="poll-bar">
                <div className="poll-fill" style={{ width: `${item.value}%` }} />
              </div>
              <span className="poll-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="quiz-question">
          <div className="quiz-question-title">{question.question}</div>
          <div className="quiz-options">
            {question.options.map(option => (
              <button
                key={option.type}
                type="button"
                className={`quiz-option ${answers[index] === option.type ? "active" : ""}`}
                onClick={() => selectAnswer(index, option.type)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="quiz-actions">
        <button className="quiz-submit" onClick={submitQuiz} disabled={!allAnswered}>
          Reveal your punk type
        </button>
        <button type="button" className="quiz-reset" onClick={resetQuiz}>
          Start over
        </button>
      </div>

      {result && (
        <div className="quiz-result">
          <div className="quiz-result-title">{result.title}</div>
          <p>{result.description}</p>

          <div className="quiz-poll-title">Live poll results</div>
          <div className="quiz-copy">Total votes: {pollTotal}</div>
          <div className="quiz-poll">
            {pollData.map(item => (
              <div key={item.label} className="poll-row">
                <span className="poll-label">{item.label}</span>
                <div className="poll-bar">
                  <div className="poll-fill" style={{ width: `${item.value}%` }} />
                </div>
                <span className="poll-value">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Time formatting utility
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Timer constants
export const WORK_TIME = 25 * 60;
export const BREAK_TIME = 5 * 60;

// AI Question Generator
export const generateQuestion = () => {
  const questions = [
    {
      q: "What are the two main stages of photosynthesis?",
      a: "light reactions and the Calvin cycle",
      hints: [
        "Think about what happens in different parts of the chloroplast",
        "One involves light directly, the other fixes carbon"
      ]
    },
    {
      q: "What is the chemical equation for photosynthesis?",
      a: "6CO2 + 6H2O + light → C6H12O6 + 6O2",
      hints: [
        "It involves carbon dioxide, water, and produces glucose and oxygen",
        "Count the molecules carefully"
      ]
    },
    {
      q: "Where does the Calvin cycle occur?",
      a: "stroma",
      hints: [
        "It's a part of the chloroplast",
        "Not in the membrane, but in the fluid-filled space"
      ]
    },
    {
      q: "What molecules are produced during light reactions?",
      a: "NADPH and ATP",
      hints: [
        "Energy-carrying molecules",
        "Both are used in the Calvin cycle"
      ]
    },
    {
      q: "What pigment absorbs light in photosynthesis?",
      a: "chlorophyll",
      hints: [
        "It's green",
        "Found in chloroplasts"
      ]
    }
  ];
  return questions[Math.floor(Math.random() * questions.length)];
};

// Sample extracted text
export const getSampleExtractedText = () => {
  return `
    Photosynthesis is the process by which plants convert light energy into chemical energy.
    The equation is: 6CO2 + 6H2O + light → C6H12O6 + 6O2
    Chlorophyll in chloroplasts absorbs light, primarily red and blue wavelengths.
    The Calvin cycle occurs in the stroma and fixes carbon dioxide.
    Light-dependent reactions occur in the thylakoid membranes.
    Photosynthesis has two main stages: light reactions and the Calvin cycle.
    NADPH and ATP are produced during light reactions.
    The products of photosynthesis are glucose and oxygen.
  `;
};

// Check if answer is correct
export const checkAnswer = (userAnswer, correctAnswer) => {
  const user = userAnswer.toLowerCase().trim();
  const correct = correctAnswer.toLowerCase().trim();
  return user.includes(correct) || correct.includes(user);
};
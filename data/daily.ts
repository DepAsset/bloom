export type DailyRitual = {
  messages: [string, string, string];
  promise: string;
  journey: "seed" | "rain" | "light";
  flower: "cosmos" | "cherry" | "jasmine" | "lavender";
  breath: number;
};

const ritualPromises = [
  "You don't have to believe in everything ahead. Just believe in today.",
  "We aren't trying to become perfect. We're simply returning.",
  "One page. One breath. One quiet return.",
  "Growth happens quietly, long before anyone can see it.",
  "You are allowed to begin again without explaining yesterday.",
  "Today's courage is enough for today.",
  "The bravest thing you do today may simply be opening the book.",
  "There is no race here. Only a gentle next step.",
  "You can move softly and still move forward.",
  "A small beginning still changes the shape of a day.",
  "Let today be lighter than the story you tell about it.",
  "You do not need certainty before you begin.",
  "Your pace is allowed to look like care.",
  "Nothing about returning is small.",
  "Start with the part of you that is still willing.",
  "You have carried enough. Let the next step be gentle.",
  "The book is not judging you. It is simply waiting.",
  "Today asks for presence, not proof.",
  "Begin before confidence arrives. It knows where to find you.",
  "Your effort can be quiet and still be real.",
  "A difficult yesterday does not own this morning.",
  "You are more than the moment that frightened you.",
  "Let one honest attempt be enough for now.",
  "This morning does not need a grand plan. It needs one kind choice.",
  "Rested or weary, you are still welcome here.",
  "You can meet the syllabus without fighting yourself.",
  "The next ten minutes belong only to the next ten minutes.",
  "You are not behind in a life that is yours.",
  "Return gently. The rest can unfold from there.",
  "There is room for fear and a beginning in the same heart.",
];

const quotes = [
  "You are not starting over. You are starting with experience.",
  "The syllabus stayed the same. You did not.",
  "Failure is not proof that your effort was wasted.",
  "You have already survived your hardest day so far.",
  "There is still time, and there is still you.",
  "A slower day is not an empty day.",
  "Your worth was never hiding inside a result.",
  "You can be afraid and still be capable.",
  "Returning is its own quiet kind of courage.",
  "Not every flower opens on the same morning.",
  "You do not owe today a perfect version of yourself.",
  "The work you did still lives inside you.",
  "One difficult paper cannot tell your whole story.",
  "Softness is not the opposite of discipline.",
  "You are allowed to learn without punishing yourself.",
  "A page read with care still counts.",
  "Your future is larger than one examination hall.",
  "Today can be useful without being exhausting.",
  "You have not lost the person who worked so hard.",
  "Hope does not need to be loud to be alive.",
  "The next attempt is not the last attempt repeated.",
  "Confidence often returns after you do, not before.",
  "You can trust the version of you that kept going.",
  "Nothing blooms by being shouted at.",
  "Let consistency feel like coming home.",
  "You are still capable on the days you cannot feel it.",
  "There is wisdom in beginning smaller.",
  "Your calm deserves a place in your preparation.",
  "Enough for today is still enough.",
  "You are here. That is where every new chapter begins.",
];

const evidence = [
  ["You completed Articleship.", "You learned to keep showing up even on difficult, ordinary days."],
  ["You survived an exam season once.", "You know the weight of it, and you are still choosing to return."],
  ["You have never truly quit.", "Even after disappointment, some small part of you kept the light on."],
  ["You did the work.", "One panicked moment cannot erase months of sincere preparation."],
  ["You asked for a gentler way.", "Knowing what you need is evidence of strength, not weakness."],
  ["You came back today.", "No score can measure the courage hidden inside that choice."],
  ["You already know more than before.", "Experience came with a cost, but it belongs to you now."],
  ["I believe in you.", "You do not have to carry all the belief by yourself today."],
  ["You kept your softness.", "A difficult result did not turn your heart against itself."],
  ["You are still curious.", "The part of you that wants to understand is very much alive."],
] as const;

function dayNumber() {
  const now = new Date();
  return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000);
}

export function getDailyContent() {
  const day = dayNumber();
  const promise = ritualPromises[day % ritualPromises.length];
  const journeys: Array<Pick<DailyRitual, "messages" | "journey">> = [
    { journey: "seed", messages: ["Take one slow breath.", "Leave yesterday here.", "Today deserves a fresh beginning."] },
    { journey: "rain", messages: ["Let the rain soften the noise.", "Notice the small green thing returning.", "You can open in your own time."] },
    { journey: "light", messages: ["Let your shoulders fall.", "Make a little room for light.", "Bring only this moment with you."] },
    { journey: "seed", messages: ["Breathe in without asking anything.", "Let the ground hold what feels heavy.", "A quiet beginning is still a beginning."] },
    { journey: "rain", messages: ["You don't have to hurry the weather.", "Something tender is taking root.", "Meet today exactly as you are."] },
    { journey: "light", messages: ["Pause at the edge of the day.", "Keep only what feels kind.", "There is enough light for one small step."] },
  ];
  const ritual = journeys[day % journeys.length];
  const flowers: DailyRitual["flower"][] = ["cosmos", "cherry", "jasmine", "lavender"];
  return {
    ritual: {
      ...ritual,
      promise,
      flower: flowers[(day * 5) % flowers.length],
      breath: 1.15 + (day % 4) * .12,
    } satisfies DailyRitual,
    quote: quotes[(day * 7) % quotes.length],
    evidence: evidence[(day * 3) % evidence.length],
  };
}

export type Mood = "peaceful" | "okay" | "tired" | "low" | "heavy";

const STORAGE_KEY = "bloom-mood";

interface StoredMood {
  mood: Mood;
  date: string;
}

function today() {
  return new Date().toISOString().split("T")[0];
}

export function saveMood(mood: Mood) {
  const value: StoredMood = {
    mood,
    date: today(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function loadMood(): Mood | null {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return null;

  try {
    const parsed: StoredMood = JSON.parse(raw);

    if (parsed.date !== today()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed.mood;
  } catch {
    return null;
  }
}

export function clearMood() {
  localStorage.removeItem(STORAGE_KEY);
}
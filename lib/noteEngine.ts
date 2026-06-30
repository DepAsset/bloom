import { notesFromAmaan } from "@/data/notesFromAmaan";

export function getRandomNote() {

    const chance = Math.random();

    // 10% chance → Amaan's personal note
    if (chance < 0.10) {
        return notesFromAmaan[
            Math.floor(Math.random() * notesFromAmaan.length)
        ];
    }

    // 90% chance → Bloom's normal note
    return notesFromAmaan[
        Math.floor(Math.random() * notesFromAmaan.length)
    ];
}
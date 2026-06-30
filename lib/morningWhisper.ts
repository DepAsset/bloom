import { greetings, Greeting } from "@/data/greetings";

const HISTORY_KEY = "bloom-greeting-history";

export function getMorningWhisper(): Greeting {

    if (typeof window === "undefined") {
        return greetings[0];
    }

    const history: string[] =
        JSON.parse(
            localStorage.getItem(HISTORY_KEY) || "[]"
        );

    let pool = greetings.filter(
        g => !history.includes(g.id)
    );

    if(pool.length===0){

        localStorage.removeItem(HISTORY_KEY);

        pool=[...greetings];
    }

    const today =
        new Date()
        .toISOString()
        .slice(0,10);

    const seed=
        today
        .split("")
        .reduce(
            (a,c)=>a+c.charCodeAt(0),
            0
        );

    const chosen=
        pool[
            seed%pool.length
        ];

    history.push(chosen.id);

    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(
            history.slice(-30)
        )

    );

    return chosen;

}
export interface Greeting {

    id: string;

    category:
        | "welcome"
        | "morning"
        | "encouragement"
        | "heavy"
        | "happy"
        | "amaan";

    title: string;

    subtitle: string;

    rarity:
        | "common"
        | "rare"
        | "special";
}

export const greetings: Greeting[] = [
  {
      id:"morning-1",

      category:"morning",

      title:"Good morning, Jii.",

      subtitle:"Let's begin slowly today.",

      rarity:"common"
  },

  {
      id:"morning-2",

      category:"morning",

      title:"Hi, Jii.",

      subtitle:"Morning is still unfolding. There's no need to rush.",

      rarity:"common"
  },

  {
      id:"morning-3",

      category:"morning",

      title:"Welcome back.",

      subtitle:"The sun remembered to rise. You remembered to come.",

      rarity:"common"
  },

  {
      id:"morning-4",

      category:"morning",

      title:"A gentle morning.",

      subtitle:"One page is enough to begin today.",

      rarity:"common"
  },

  {
      id:"morning-5",

      category:"morning",

      title:"Good to see you.",

      subtitle:"Let's keep today soft.",

      rarity:"common"
  },

  {
      id:"encouragement-1",

      category:"encouragement",

      title:"I'm proud of you.",

      subtitle:"You came. That already matters.",

      rarity:"common"
  },

  {
      id:"encouragement-2",

      category:"encouragement",

      title:"Some mornings begin with courage.",

      subtitle:"Others begin with simply opening Bloom. Both count.",

      rarity:"common"
  },

  {
      id:"encouragement-3",

      category:"encouragement",

      title:"Showing up is enough.",

      subtitle:"Everything else can happen afterwards.",

      rarity:"common"
  },

  {
      id:"heavy-1",

      category:"heavy",

      title:"Let's make today smaller.",

      subtitle:"We'll carry only one thing today.",

      rarity:"common"
  },

  {
      id:"heavy-2",

      category:"heavy",

      title:"You're safe here.",

      subtitle:"Nothing needs to be conquered today.",

      rarity:"common"
  },


  {
      id:"happy-1",

      category:"happy",

      title:"The flowers seem happier today.",

      subtitle:"Maybe they knew you were coming.",

      rarity:"rare"
  },

  {
      id:"happy-2",

      category:"happy",

      title:"A butterfly visited first.",

      subtitle:"I think that's a good sign.",

      rarity:"rare"
  },

  {
      id:"amaan-1",

      category:"amaan",

      title:"I still believe in you.",

      subtitle:"Even on the days you don't.",

      rarity:"special"
  },

  {
      id:"amaan-2",

      category:"amaan",

      title:"One day...",

      subtitle:"We'll both smile remembering how scared we were.",

      rarity:"special"
  }
];
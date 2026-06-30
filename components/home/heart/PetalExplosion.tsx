"use client";

import { motion } from "framer-motion";

type Props = {
  phase: number;
};

const petals = Array.from({ length: 28 }, (_, i) => {

  const angle = (360 / 28) * i;

  const radius = 180 + Math.random() * 120;

  return {

    angle,

    radius,

    rotation: Math.random() * 720,

    scale: .6 + Math.random() * .8,

    delay: Math.random() * .18,

  };

});

export default function PetalExplosion({

  phase,

}: Props) {

  return (

    <>

      {petals.map((petal, index) => {

        const x = Math.cos(petal.angle * Math.PI / 180) * petal.radius;

        const y = Math.sin(petal.angle * Math.PI / 180) * petal.radius;

        return (

          <motion.div

            key={index}

            className="petal"

            initial={{

              opacity:0,

              scale:0,

              x:0,

              y:0,

              rotate:0,

            }}

            animate={

              phase>=5

              ?{

                opacity:[0,1,.95,.75,0],

                scale:[0,petal.scale,petal.scale*.9,petal.scale*.8],

                x,

                y,

                rotate:petal.rotation,

              }

              :{}

            }

            transition={{

              duration:2.8,

              delay:petal.delay,

              ease:"easeOut",

            }}

          >

            🌸

          </motion.div>

        );

      })}

    </>

  );

}
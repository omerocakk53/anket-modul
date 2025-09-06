import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ses from "./success.mp3";
export default function SuccessMessage({ message, animationId, onDone }) {
  const [phase, setPhase] = useState("text");
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio(ses);

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.error("Ses çalma hatası:", error);
      }
    };

    const timer1 = setTimeout(() => {
      setPhase("icon");
      playAudio(); // Ses çalma burada başlatılıyor
    }, 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, [navigate, onDone]);

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: [0.8, 1.1, 1],
      y: [50, -10, 0],
      transition: { duration: 1.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.9,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -30 },
    visible: {
      opacity: 1,
      scale: [0.5, 1.3, 1],
      rotate: [0, 20, -10, 0],
      transition: { duration: 1.1, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 pointer-events-none">
      <div className="relative flex flex-col items-center justify-center p-12">
        <AnimatePresence mode="wait">
          {phase === "text" && (
            <motion.h1
              key={`text-${animationId}`}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-white text-4xl sm:text-5xl font-bold text-center drop-shadow-lg"
            >
              {message}
            </motion.h1>
          )}
          {phase === "icon" && (
            <motion.div
              key={`icon-${animationId}`}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-green-400 text-7xl sm:text-8xl drop-shadow-2xl"
            >
              <FaCheckCircle />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

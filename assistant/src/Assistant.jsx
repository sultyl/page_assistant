import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Assistant = ({ position, message }) => {
  
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (isVisible) {
      const speech = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(speech);
    }
  }, [isVisible, message]);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  const handleAskAboutMeClick = () => {
    const aboutMeMessage =
      "Hello, I am king Sultan, A Stage Five HNGX Frontend Intern, Here is My Page Assistance to get you through this page. Thank you";
    const aboutMeSpeech = new SpeechSynthesisUtterance(aboutMeMessage);
    speechSynthesis.speak(aboutMeSpeech);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: position.x, y: position.y }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="fixed flex items-center space-x-2 bottom-0 left-0 p-4"
          style={{ zIndex: 9999 }}
        >
          <div>
            <img
              src="/assistant.jpg"
              alt="Assistant"
              className="w-60 h-40"
            />
            <p className="bg-white p-2 rounded shadow-md">{message}</p>
            <button
              onClick={handleAskAboutMeClick}
              className="bg-[#f04a4a] hover:bg-[#341114] text-white font-bold py-2 px-4 rounded-md"
            >
              About Me
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Assistant;
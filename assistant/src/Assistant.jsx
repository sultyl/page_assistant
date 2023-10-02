import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // You'll need to install framer-motion

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
      "Hi, I am Miracle, A Stage Five Frontend Intern, This is My Assistance";
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
              src="https://img.freepik.com/free-photo/fun-cartoon-kid-with-rain-gear_183364-81176.jpg?size=626&ext=jpg&uid=R57565075&ga=GA1.2.1457933022.1696277192&semt=ais"
              alt="Assistant"
              className="w-40 h-40"
            />
            <p className="bg-white p-2 rounded shadow-md">{message}</p>
            <button
              onClick={handleAskAboutMeClick}
              className="bg-[#FB00FA] hover:bg-[#B703B6] text-white font-bold py-2 px-4 rounded"
            >
              Ask about me?
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Assistant;

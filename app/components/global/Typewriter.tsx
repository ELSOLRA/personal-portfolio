"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  textColor?: string;
  startDelay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  textColor = "#333333",
  startDelay = 0,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialBlinking, setIsInitialBlinking] = useState(true);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);

  // reset when text changes
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsInitialBlinking(true);
    setHasStarted(startDelay === 0);
  }, [text, startDelay]);

  // handles the start delay
  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);

      return () => clearTimeout(startTimer);
    }
  }, [hasStarted, startDelay]);

  // initial blinking before typing starts
  useEffect(() => {
    if (isInitialBlinking && hasStarted) {
      const initialDelay = setTimeout(() => {
        setIsInitialBlinking(false);
      }, 1500);

      return () => clearTimeout(initialDelay);
    }
  }, [isInitialBlinking, hasStarted]);

  // typing text after initial blinking
  useEffect(() => {
    if (!isInitialBlinking && currentIndex < text.length && hasStarted) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 120);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isInitialBlinking, hasStarted]);

  return (
    <span className="relative">
      {displayText}
      {currentIndex < text.length && hasStarted && (
        <span className="inline-block relative w-5 h-0.5 ml-0.5 -mb-0.5 animate-cursor-blink text-theme"></span>
      )}
    </span>
  );
};

export default TypewriterText;

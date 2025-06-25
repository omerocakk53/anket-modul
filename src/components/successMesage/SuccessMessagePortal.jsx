// components/SuccessMessagePortal.jsx
import React, { useState, useEffect } from "react";
import SuccessMessage from "./SuccessMessage";
import { subscribeToSuccess, unsubscribeFromSuccess } from "./successController";

export default function SuccessMessagePortal() {
  const [messages, setMessages] = useState([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const handler = (msg) => {
      setMessages((prev) => [...prev, { id: idCounter, msg }]);
      setIdCounter((prev) => prev + 1);
    };
    subscribeToSuccess(handler);
    return () => unsubscribeFromSuccess(handler);
  }, [idCounter]);

  const handleDone = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <>
      {messages.map(({ id, msg }) => (
        <SuccessMessage
          key={id}
          animationId={id}
          message={msg}
          onDone={() => handleDone(id)}
        />
      ))}
    </>
  );
}

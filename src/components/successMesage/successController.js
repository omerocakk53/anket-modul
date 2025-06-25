// utils/successController.js

let listeners = [];

export const showSuccess = (message) => {
  listeners.forEach((cb) => cb(message));
};

export const subscribeToSuccess = (cb) => {
  listeners.push(cb);
};

export const unsubscribeFromSuccess = (cb) => {
  listeners = listeners.filter((l) => l !== cb);
};

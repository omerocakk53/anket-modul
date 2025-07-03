export let toast = null;

export function setToast(toastInstance) {
  console.log('toast:', toastInstance);
  toast = toastInstance;
}

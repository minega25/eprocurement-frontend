export const showToast = (
  toast: any,
  {
    severity = 'info',
    summary = 'Success',
    message = 'Message Content',
    life = 3000,
  }
) => {
  toast.current.show({ severity, summary, detail: message, life });
};

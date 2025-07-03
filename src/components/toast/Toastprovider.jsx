import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "12px",
            boxShadow: "0 8px 15px rgba(118, 75, 162, 0.3)",
            padding: "14px 24px",
            fontSize: "16px",
            letterSpacing: "0.02em",
          },
          // Success tipi toast için ekstra stil
          success: {
            duration: 2000,
            style: {
              background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
              color: "#fff",
              fontWeight: "700",
            },
          },
          // Hata tipi toast için ekstra stil
          error: {
            duration: 3000,
            style: {
              background: "linear-gradient(135deg, #f85032 0%, #e73827 100%)",
              color: "#fff",
              fontWeight: "700",
            },
          },
        }}
      />
    </>
  );
};

export default ToastProvider;

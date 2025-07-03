import { Toaster } from "react-hot-toast";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#4F46E5",         // primary
            color: "#ffffff",              // primary-text
            fontWeight: "600",
            borderRadius: "12px",
            boxShadow: "0 8px 15px rgba(79, 70, 229, 0.4)", // primary biraz transparan gölge
            padding: "14px 24px",
            fontSize: "16px",
            letterSpacing: "0.02em",
          },
          success: {
            duration: 2000,
            style: {
              background: "#22c55e",       // success
              color: "#ffffff",            // primary-text (beyaz)
              fontWeight: "700",
              boxShadow: "0 8px 15px rgba(34, 197, 94, 0.4)", 
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#ef4444",       // danger
              color: "#ffffff",            // primary-text
              fontWeight: "700",
              boxShadow: "0 8px 15px rgba(239, 68, 68, 0.4)",
            },
          },
          warning: {
            duration: 3000,
            style: {
              background: "#eab308",       // warning
              color: "#000077",            // primary-darktext
              fontWeight: "700",
              boxShadow: "0 8px 15px rgba(234, 179, 8, 0.4)",
            },
          },
          info: {
            duration: 2500,
            style: {
              background: "#3b82f6",       // info
              color: "#ffffff",
              fontWeight: "600",
              boxShadow: "0 8px 15px rgba(59, 130, 246, 0.4)",
            },
          },
        }}
      />
    </>
  );
};

export default ToastProvider;

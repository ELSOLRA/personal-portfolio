interface FormStatus {
  error: boolean;
  message: string | null;
  visible: boolean;
}

export const StatusMessage = ({ status }: { status: FormStatus }) => {
  if (!status.message || !status.visible) return null;

  return (
    <div
      className={`mt-4 ${status.error ? "text-red-500" : "text-[#0FAA23]/80"} transition-opacity duration-500 ${status.visible ? "opacity-100" : "opacity-0"}`}>
      {status.error
        ? "There was a problem sending your message. Please try again."
        : "Your message has been sent successfully. I'll get back to you soon!"}
    </div>
  );
};

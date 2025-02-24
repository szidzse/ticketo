interface FormSuccessProps {
  message?: string;
}

export const FormError = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex space-x-4 items-center p-2 rounded-lg text-red-500 bg-red-500/30">
      <p>{message}</p>
    </div>
  );
};

import { Alert, AlertColor, CircularProgress } from "@mui/material";

interface ErrorContainerProps {
  message: string | null;
  severity?: AlertColor;
}

interface ProcessImageProps {
  text?: string;
  className?: string;
}

export const ErrorContainer = ({ message, severity = "error" }: ErrorContainerProps) => {
  if (!message) return null;

  return (
    <div className="container mx-auto mt-16">
      <Alert severity={severity}>{message}</Alert>
    </div>
  );
};

export const ProcessImage = ({ text, className }: ProcessImageProps) => {
  return (
    <div className={`container mx-auto flex justify-center mt-10 ${className || ""}`}>
      {text && <span className="mr-4 text-gray-500">{text}</span>}
      <CircularProgress />
    </div>
  );
};

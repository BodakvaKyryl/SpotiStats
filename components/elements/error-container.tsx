import { Container, Alert, AlertColor, CircularProgress } from "@mui/material";

interface ErrorContainerProps {
  message: string | null;
  severity?: AlertColor;
}

interface ProcessImageProps {
  text?: string;
  mt?: number;
}

export const ErrorContainer = ({ message, severity = "error" }: ErrorContainerProps) => {
  if (!message) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Alert severity={severity}>{message}</Alert>
    </Container>
  );
};

export const ProcessImage = ({ mt = 10 }: ProcessImageProps) => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt }}>
      <CircularProgress />
    </Container>
  );
};

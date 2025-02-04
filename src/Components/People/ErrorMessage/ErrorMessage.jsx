import { Alert, AlertTitle } from "@mui/material";

function ErrorMessage({ message, onClose }) {
	return (
		<Alert severity="error" variant="filled" onClose={onClose}>
			<AlertTitle>Error</AlertTitle>
			{message}
		</Alert>
	);
}

export default ErrorMessage;

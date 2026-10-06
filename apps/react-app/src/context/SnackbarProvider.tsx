// ACT 7 - Create SnackbarProvider
// Obtenido de MUI "Use with Alerts" modificado para la actividad y ser usado con multiples mensajes

import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface SnackbarProviderProps {
    message?: string;
    open: boolean;
    OnClose: () => void;
}

function SnackbarProvider({ message, open, OnClose }: SnackbarProviderProps) {
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        OnClose();
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SnackbarProvider;
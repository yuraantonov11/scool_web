import { FC, useState } from 'react';
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, CircularProgress } from "@mui/material";

interface InputsLoginForm {
  email: string;
  password: string;
}

const isDemo = Boolean(process.env.REACT_APP_DEMO);

const LoginForm: FC<{
  onSubmit?: (data: InputsLoginForm) => void;
  error?: string;
  isLoadingButton?: boolean;
}> = ({ onSubmit, error, isLoadingButton }) => {
  const { handleSubmit, control } = useForm<InputsLoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [typePassword, setStypePassword] = useState<'password' | 'text'>(
    'password'
  );

  const submitHandler: SubmitHandler<InputsLoginForm> = (data) =>
    onSubmit && onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Box sx={{ my: 3 }}>
        <Typography color="textPrimary" variant="h4">
          Вхід
        </Typography>
      </Box>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Ви повинні ввести свою електронну адресу.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Ви повинні ввести дійсну електронну адресу.',
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            variant="outlined"
            error={!!error}
            helperText={
              error
                ? error.message
                : isDemo && 'Тестова електронна адреса: email@test.com'
            }
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Ви повинні ввести свій пароль.' }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label="Пароль"
            margin="normal"
            type={typePassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setStypePassword(
                        typePassword === 'password' ? 'text' : 'password'
                      )
                    }
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {typePassword !== 'password' ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            error={!!error}
            helperText={
              error ? error.message : isDemo && 'Тестовий пароль: password'
            }
          />
        )}
      />
      <Box sx={{ position: "relative" }}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isLoadingButton}
        >
          Вхід
        </Button>
          {isLoadingButton && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
};

export default LoginForm;

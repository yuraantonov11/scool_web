import { FC, useState } from 'react';

import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';

import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';

import { RootState } from '../../../../../state/store';
import { AuthState, AuthStoreStatus } from '../../../../../state/auth/slice';

export interface InputBasicDetailsForm {
  first_name: string;
  last_name: string;
  password: string;
}

const BasicDetailsForm: FC<{
  onSubmit?: (data: InputBasicDetailsForm) => void;
}> = ({ onSubmit }) => {
  const { data, status } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  const { control, handleSubmit, setValue } = useForm<InputBasicDetailsForm>({
    defaultValues: {
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      password: '',
    },
  });
  const [disabled, setDisabled] = useState(true);

  const _onSubmit = (data: InputBasicDetailsForm) => {
    onSubmit && onSubmit(data);
    setDisabled(true);
    setValue('password', '');
  };

  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <Controller
        control={control}
        name="first_name"
        rules={{
          required: 'Ви повинні ввести своє ім\'я.',
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label="Ім'я"
            margin="normal"
            type="text"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
            size="small"
          />
        )}
      />
      <Controller
        control={control}
        name="last_name"
        rules={{
          required: 'Ви повинні ввести своє прізвище.',
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label="Прізвище"
            margin="normal"
            type="text"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
            size="small"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <TextField
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            fullWidth
            label="Пароль"
            margin="normal"
            type="password"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : null}
            size="small"
          />
        )}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          onClick={() => setDisabled(false)}
          variant="outlined"
          size="small"
          disabled={!disabled}
        >
          Редагувати
        </Button>
        <LoadingButton
          onClick={() => setDisabled(false)}
          variant="contained"
          size="small"
          disabled={disabled}
          type="submit"
          loading={status === AuthStoreStatus.updatingData}
        >
          Підтвердити
        </LoadingButton>
      </Box>
    </form>
  );
};

export default BasicDetailsForm;

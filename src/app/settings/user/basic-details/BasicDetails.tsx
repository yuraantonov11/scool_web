import { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';

// import { useDispatch } from 'react-redux';

// import { AppDispatch } from '../../../../state/store';
// import { updateData as updateUserData } from '../../../../state/auth/slice';
import AlertCollapse from '../../../shared/alert/Alert';
import BasicDetailsForm /* , { InputBasicDetailsForm } */ from './form/Form';

const BasicDetails = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (/* data: InputBasicDetailsForm */) => {
    // dispatch(updateUserData(data)).then(() => {
    //   setShowAlert(true);
    // });
    setShowAlert(true);
    window.alert(
      "Щоб пароль завжди був однаковим, ми не дозволяємо змінювати конфігурацію користувача :)"
    );
  };

  return (
    <Paper elevation={1} sx={{ py: 4, px: 3 }}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Загальні</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <AlertCollapse open={showAlert} onClose={() => setShowAlert(false)}>
            Користувача успішно оновлено!
          </AlertCollapse>
          <BasicDetailsForm onSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BasicDetails;

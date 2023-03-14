import React from 'react';
import {mount, shallow} from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginPage from './LoginPage';
import { RootState } from '../store';
import {Tab} from '@mui/material';
import TextField from '@mui/material/TextField';

const mockStore = configureStore([thunk]);

describe('LoginPage', () => {
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the login form by default', () => {
    expect(wrapper.find('.login-form')).toHaveLength(1);
    expect(wrapper.find('[type="email"].login-email')).toHaveLength(1);
    expect(wrapper.find('[type="password"].login-password')).toHaveLength(1);
    expect(wrapper.find('button[type="submit"].login-submit')).toHaveLength(1);
  });

  it('should update email and password state on input change in the login form', () => {
    const emailInput = wrapper.find('.login-email').find(TextField).find('input');
    const passwordInput = wrapper.find('.login-password').find(TextField).find('input');

    emailInput.simulate('change', { target: { value: 'test@test.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });

    expect(wrapper.find('.login-email').find(TextField).find('input').prop('value')).toBe('test@test.com');
    expect(wrapper.find('.login-password').find(TextField).find('input').prop('value')).toBe('password');
  });


  // it('should render the register form when the "Register" tab is selected', () => {
  //   const registerTab = wrapper.find('button[aria-controls="tabpanel-1"]');
  //   registerTab.simulate('click');
  //
  //   expect(wrapper.find('.register-form')).toHaveLength(1);
  //   expect(wrapper.find('.register-name')).toHaveLength(1);
  //   expect(wrapper.find('.register-email')).toHaveLength(1);
  //   expect(wrapper.find('.register-password')).toHaveLength(1);
  //   expect(wrapper.find('.register-submit')).toHaveLength(1);
  // });
  //
  // it('should update name, email, and password state on input change in the register form', () => {
  //   wrapper.find(Tab).at(1).simulate('click');
  //   const nameInput = wrapper.find('.register-name').find(TextField).find('input');
  //   const emailInput = wrapper.find('.register-email').find(TextField).find('input');
  //   const passwordInput = wrapper.find('.register-password').find(TextField).find('input');
  //
  //   nameInput.simulate('change', { target: { value: 'John Doe' } });
  //   emailInput.simulate('change', { target: { value: 'john.doe@example.com' } });
  //   passwordInput.simulate('change', { target: { value: 'password123' } });
  //
  //   const nameState = store.getState().auth.name;
  //   const emailState = store.getState().auth.email;
  //   const passwordState = store.getState().auth.password;
  //
  //   expect(nameState).toBe('John Doe');
  //   expect(emailState).toBe('john.doe@example.com');
  //   expect(passwordState).toBe('password123');
  // });
});

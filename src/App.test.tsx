import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('renders home page', () => {
  render(
    <Provider store={mockStore({})}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/Welcome to Scool/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login page for /login route', () => {
  render(
    <Provider store={mockStore({})}>
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders not found page for unknown route', () => {
  render(
    <Provider store={mockStore({})}>
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/Oops! Page not found./i);
  expect(linkElement).toBeInTheDocument();
});

test('renders dashboard page for /dashboard route when authenticated', () => {
  const store = mockStore({
    auth: {
      isAuthenticated: true,
      user: {
        id: 1,
        email: 'test@test.com',
      },
    },
  });
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/This is the dashboard page./i);
  expect(linkElement).toBeInTheDocument();
});

test('redirects to /login for /dashboard route when not authenticated', () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
    },
  });
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});

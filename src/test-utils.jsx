import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import store from './store'; // Nanti kita buat store-nya

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // store = store,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      // <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      // </Provider>
    );
  }
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

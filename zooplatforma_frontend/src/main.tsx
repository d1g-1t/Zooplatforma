import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { RouterProvider } from 'react-router-dom';
import router from './app/routes/index.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
} else {
  console.warn('There is no element with id "root" in the DOM');
}

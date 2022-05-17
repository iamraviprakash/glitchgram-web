import React, { Suspense } from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import RootComponent from './RootComponent';
import { queryClient, QueryClientProvider } from './config';
import { QueryParamProvider } from 'use-query-params';

ReactDOM.render(
  <QueryClientProvider value={queryClient}>
    <QueryParamProvider>
      <Suspense fallback={'Loading...'}>
        <React.StrictMode>
          <RootComponent />
        </React.StrictMode>
      </Suspense>
    </QueryParamProvider>
  </QueryClientProvider>,
  document.getElementById('root'),
);

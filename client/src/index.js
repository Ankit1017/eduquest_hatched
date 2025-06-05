
import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { ClerkProvider } from '@clerk/clerk-react';

const root = createRoot(document.getElementById('root'));


const clerkPubKey = 'pk_test_Y2xlYW4tc2x1Zy00My5jbGVyay5hY2NvdW50cy5kZXYk';
root.render(
    <ClerkProvider publishableKey={clerkPubKey}>
        <App />
    </ClerkProvider>
);

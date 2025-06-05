// pages/Login.jsx
import { SignIn } from '@clerk/clerk-react';

const SyncUser = () => {
  return (
    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
      <SignIn redirectUrl="/home" />
    </div>
  );
};

export default SyncUser;

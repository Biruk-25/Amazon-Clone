import React, { useContext, useEffect } from 'react';
import { DataContext } from './Components/DataProvider/DataProvider';
import { Type } from './Utility/action';
import { auth } from './Utility/firebase';
import Routing from './Components/Routing';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({
        type: Type.SET_USER,
        user: authUser || null,
      });
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      {/* Disclaimer banner */}
      <div
        style={{
          backgroundColor: '#ffcccb',
          color: '#000',
          padding: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '0.95rem',
          borderBottom: '2px solid #d9534f',
        }}
      >
        ⚠️ This is a portfolio clone of Amazon built for educational purposes only. No real products or transactions. ⚠️
      </div>

      {/* Existing routes */}
      <Routing />
    </div>
  );
}

export default App;


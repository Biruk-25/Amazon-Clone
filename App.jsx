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
      <Routing />
    </div>
  );
}

export default App;



// import React, {useContext, useEffect} from 'react';
// import { DataContext } from './Components/DataProvider/DataProvider';
// import { Type } from './Utility/action';
// import { auth } from './Utility/firebase';
// import Routing from './Components/Routing';
// function App() {
//   const [{user}, dispatch] = useContext(DataContext)
//  useEffect (()=> {
//   auth.onAuthStateChanged((authUser)=>{
//     if(authUser){
//       // console.log(authUser);
//       dispatch({
//         type:Type.SET_USER,
//         user :authUser
//       })
      
//     }else {
//       dispatch({
//         type:Type.SET_USER,
//         user :null,
//       })
//     }

//   })
//  },[])

//   return (
//     <div>
//   <Routing/>
//     </div>
//   )
// }

// export default App;
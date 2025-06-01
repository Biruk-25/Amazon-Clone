



import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './SignUp.module.css';
import { auth } from '../../Utility/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action';
import { ClipLoader } from 'react-spinners';
import { errorMessages, getFallback } from '../../Utility/authErrors';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({ signin: false, signup: false });

  const [, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location?.state?.redirect || '/';

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  const handleAuth = async (e, mode) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading((prev) => ({ ...prev, [mode]: true }));

    try {
      const userCredential =
        mode === 'signin'
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);

      dispatch({ type: Type.SET_USER, user: userCredential.user });

      if (mode === 'signup') {
        setEmail('');
        setPassword('');
      }

      navigate(redirectPath);
    } catch (err) {
      const message = errorMessages[mode][err.code] || getFallback(mode);
      console.error(err);
      setError(message);
    } finally {
      setLoading((prev) => ({ ...prev, [mode]: false }));
    }
  };

  return (
    <section className={styles.authSection}>
      <div className={styles.formContainer}>
      <Link to="/" className={styles.logoLink}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon logo"
          className={styles.logo}
        />
      </Link>

      <div className={styles.formContainer}>
        <h1>Sign In</h1>

        {location?.state?.msg && (
          <small className={styles.errorMessage}>
            {location.state.msg}
          </small>
        )}

        <form className={styles.form} onSubmit={(e) => handleAuth(e, 'signin')}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <span className={styles.icon}>📧</span> Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <span className={styles.icon}>🔒</span> Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={`${styles.signInButton} ${styles.button}`}
            disabled={loading.signin}
          >
            {loading.signin ? <ClipLoader size={20} color="green" /> : 'Sign In'}
          </button>
        </form>

        <p className={styles.policy}>
          By creating an account (Fake), you agree to the Terms of Service,
          Privacy Policy, and all applicable laws and regulations.
        </p>

        <button
          className={`${styles.createAccountButton} ${styles.button}`}
          onClick={(e) => handleAuth(e, 'signup')}
          disabled={loading.signup}
        >
          {loading.signup ? <ClipLoader size={20} color="green" /> : 'Create your Amazon Account'}
        </button>
      </div>
      </div>
    </section>
  );
}

export default Auth;





// import React, { useState, useContext } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import styles from './SignUp.module.css';
// import { auth } from '../../Utility/firebase';
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from 'firebase/auth';
// import { DataContext } from '../../Components/DataProvider/DataProvider';
// import { Type } from '../../Utility/action';
// import { ClipLoader } from 'react-spinners';
// import { errorMessages, getFallback } from '../../Utility/authErrors';

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState({ signin: false, signup: false });

//   const [{ user }, dispatch] = useContext(DataContext);
//   const navigate = useNavigate();
//   const navStateData = useLocation()

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return 'Please enter a valid email address.';
//     }
//     if (password.length < 6) {
//       return 'Password must be at least 6 characters.';
//     }
//     return '';
//   };

//   const handleAuth = async (e, mode) => {
//     e.preventDefault();
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setError('');
//     setLoading((prev) => ({ ...prev, [mode]: true }));
   

//     try {
//       const userCredential =
//         mode === 'signin'
//           ? await signInWithEmailAndPassword(auth, email, password)
//           : await createUserWithEmailAndPassword(auth, email, password);

//       dispatch({
//         type: Type.SET_USER,
//         user: userCredential.user,
//       });
//         navigate(navStateData?.state?.redirect || '/');
//       if (mode === 'signup') {
//         setEmail('');
//         setPassword('');
//       }

     
//     } catch (err) {
//       const message = errorMessages[mode][err.code] || getFallback(mode);
//       console.error(err);
//       setError(message);
//     } finally {
//       setLoading((prev) => ({ ...prev, [mode]: false }));
//       navigate(navStateData?.state?.redirect || '/');
//     }
//   };

//   return (
//     <section className={styles.authSection}>
//       <Link to="/" className={styles.logoLink}>
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
//           alt="Amazon logo"
//           className={styles.logo}
//         />
//       </Link>

//       <div className={styles.formContainer}>
//         <h1>Sign In</h1>
//       {navStateData?.state?.msg && (
//         <small>
//           {/* style= {{
//             padding: "5px"
//             textAlign: "center"
//             color:"red"
//             fontWeight: "bold"
//           }} */}
          
//         {navStateData?.state?.msg}
//         </small>
//       )}

//         <form className={styles.form} onSubmit={(e) => handleAuth(e, 'signin')}>
//           <div className={styles.inputGroup}>
//             <label htmlFor="email">
//               <span className={styles.icon}>📧</span> Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="example@domain.com"
//               required
//             />
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="password">
//               <span className={styles.icon}>🔒</span> Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="At least 6 characters"
//               required
//             />
//           </div>

//           {error && <p className={styles.error}>{error}</p>}

//           <button
//             type="submit"
//             className={`${styles.signInButton} ${styles.button}`}
//             disabled={loading.signin}
//           >
//             {loading.signin ? <ClipLoader size={20} color="green" /> : 'Sign In'}
//           </button>
//         </form>

//         <p className={styles.policy}>
//           By creating an account (Fake), you agree to the Terms of Service, Privacy Policy, and all applicable laws and regulations.
//         </p>

//         <button
//           className={`${styles.createAccountButton} ${styles.button}`}
//           onClick={(e) => handleAuth(e, 'signup')}
//           disabled={loading.signup}
//         >
//           {loading.signup ? <ClipLoader size={20} color="green" /> : 'Create your Amazon Account'}
//         </button>
//       </div>
//     </section>
//   );
// }

// export default Auth;

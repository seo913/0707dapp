'use client';

import axios from 'axios';
import { NextPage } from 'next';
import { FormEventHandler, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ethereum, personal } from './lib/client';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('');

  const onSubmitMetamask: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      if (!email) return;

      const accounts: any = await ethereum?.request({
        method: 'eth_requestAccounts',
      });

      if (accounts) {
        const signedToken = await personal.sign(
          `Welcome!\n\n\n${uuidv4()}`,
          accounts[0],
          'Pass'
        );

        await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
          account: accounts[0],
          email,
          signedToken,
        });

        localStorage.setItem('signedToken', signedToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-red-100 min-h-screen p-24'>
      <div>
        <form onSubmit={onSubmitMetamask}>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='ml-2 px-2 py-1 border-2 border-black rounded-md'
            type='submit'
            value='메타마스크로그인'
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
// 'use client';
// import axios from 'axios';
// import { NextPage } from 'next';
// import { FormEventHandler, useEffect, useState } from 'react';
// import { personal, web3 } from './lib/client';
// import { v4 as uuidv4 } from 'uuid';

// const Home: NextPage = () => {
//   const [email, setEmail] = useState<string>('');

//   const onSubmitMetamask: FormEventHandler = async (e) => {
//     try {
//       e.preventDefault();

//       if (!email) return;

//       const accounts = await window.ethereum?.request({
//         method: 'eth_requestAccounts',
//       });

//       if (accounts) {
//         const signedToken = await personal.sign(
//           `Welcome!\n\n\n${uuidv4()}`,
//           accounts[0],
//           'Pass'
//         );

//         // const recoverAccount = await personal.ecRecover('Hello122', signedToken); //서명된 값을 어카운트로 뽑아올수있다.
//         // console.log(recoverAccount);
//         // console.log(signedToken); // 메타마스크 서명값

//         // 앞에꺼가 응답, 뒤에꺼가 요청 요청은 백엔드에 바디 부분
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_URL}/api/user`,
//           {
//             account: accounts[0],
//             email, //email: email
//             signedToken,
//           }
//         );

//         localStorage.setItem('signedToken', signedToken);
//         // localStorage.getItem('signedToken');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // useEffect(() => {
//   //   console.log(email);
//   // }, [email]);

//   return (
//     <div className='bg-red-100 min-h-screen p-24'>
//       <div>
//         <form onSubmit={onSubmitMetamask}>
//           <input
//             type='text'
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <input
//             className='ml-2 px-2 py-1 border-2 border-blue-400 rounded-md'
//             type='submit'
//             value='메타마스크로그인'
//           />
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Home;

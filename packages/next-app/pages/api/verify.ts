// pages/api/verify.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit';

// export default async function handler(req: NextApiRequest, res: NextApiResponse<IVerifyResponse>) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const { proof, signal, verification_level } = req.body;
//     console.log('req.body', req.body);
//     const app_id = `app_staging_${process.env.NEXT_PUBLIC_WC_ACTION_APP_ID}`;
//     const action = process.env.NEXT_PUBLIC_WC_ACTION_NAME;

//     console.log('Received request to verify with proof:', proof);
//     console.log('Using app_id:', app_id);
//     console.log('Using action:', action);
//     console.log('Using verification_level:', verification_level); // Log verification_level

//     const verifyRes = await verifyCloudProof(proof, app_id, action, signal, verification_level) as IVerifyResponse;

//     console.log('Verification response:', verifyRes);

//     if (verifyRes.success) {
//       // Perform backend actions if verification succeeds (e.g., update database)
//       console.log('Verification successful');
//       res.status(200).json(verifyRes);
//     } else {
//       // Handle errors from World ID /verify endpoint
//       console.log('Verification failed:', verifyRes);
//       res.status(400).json(verifyRes);
//     }
//   } catch (error) {
//     console.error('Error verifying proof:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }

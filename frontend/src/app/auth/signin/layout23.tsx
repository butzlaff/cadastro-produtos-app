// 'use server';

// import { getSession } from '@/Services/User';
// import { redirect } from 'next/navigation';
// import { ReactNode } from 'react';

// interface ChildrenNode {
//   children: ReactNode;
// }

// export default async function AuthLayout({ children }: ChildrenNode) {
//   const user = await getSession();1

//   if (user.username === null) {
//     return <>{children}</>;
//   }
//   redirect('/');
// }

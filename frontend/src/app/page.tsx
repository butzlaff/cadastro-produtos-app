import CardProduct from '@/components/CardProduct';

export default function Home() {
  return (
    <main className='h-screen bg-slate-800 flex justify-center items-center'>
    <div className='bg-white dark:bg-slate-900/70 rounded-lg px-10 py-10 ring-1 ring-slate-900/5 shadow-xl'>
      {/* <LoginForm /> */}
      {/* <RegisterForm /> */}
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
    </div>
    </main>
  );
}

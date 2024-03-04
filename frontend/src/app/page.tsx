import CardProduct from '@/components/CardProduct';

export default function Home() {
  return (
    <main className='h-full min-h-full bg-slate-800 flex justify-center items-center'>
      <div className='bg-white dark:bg-slate-900/70 rounded-lg px-10 py-10 ring-1 ring-slate-900/5 shadow-xl grid sm:grid-cols-4'>
        {/* <LoginForm /> */}
        {/* <RegisterForm /> */}
        <CardProduct />
      </div>
    </main>
  );
}

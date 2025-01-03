import PropTypes from 'prop-types';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row min-w-screen min-h-screen">
      <aside className='hidden md:flex text-white w-[40%] bg-purple-600 flex-col justify-center items-center'>
        <div className='text-xl lg:text-2xl xl:text-3xl font-bold'>Applying For Jobs Get Easier</div>
        <div className='text-xl lg:text-2xl xl:text-3xl font-bold mt-3'>Rebuild in 2 minutes</div>
        <div className='text-xl lg:text-3xl xl:text-5xl font-black my-6'>RESUME BUILDER</div>
        <img src='/logo.svg' className='h-60'/>
      </aside>
      <main className="min-h-screen flex items-center justify-center bg-gray-100 md:w-[60%] w-[100%] flex-col">
        {children}
      </main>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
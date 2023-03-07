const App: React.FC = () => {
  return (
    <div className='bg-gray-200 flex w-[695px]'>
      <input
        className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-10'
        type='email'
        placeholder='jane@example.com'
      />
    </div>
  );
};

export default App;

import pageLoader from  '../../public/assets/pageLoader.gif'
const Loader = () => { 
  return (
    <div className="w-full h-full grid place-content-center">
      <div className='flex flex-col items-center'>
        <img width={64} src={pageLoader} alt="loading page" />
        <h1>Loading....</h1>
      </div>
    </div>
  )
}

export default Loader
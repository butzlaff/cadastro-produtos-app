const cardMock = {
  id: 1,
  name: 'Xiaomi Redmi 9',
  brand: 'Xiaomi',
  model: 'Redmi 9',
  price: 10000,
  color: 'red',
};

const CardProduct = () => {
  return (
    <div className='bg-white dark:bg-slate-900/70 rounded-lg px-4 py-4 ring-1 ring-slate-900/5 shadow-xl m-2'>
      <div className='flex flex-col items-center justify-center text-white'>
        <p className='mb-2'>Name: {cardMock.name}</p>
        <p className='mb-2'>Brand: {cardMock.brand}</p>
        <p className='mb-2'>Model:{cardMock.model}</p>
        <p className='mb-2'>Price: ${cardMock.price.toFixed(2)}</p>
        <p className='mb-2'>Color: {cardMock.color}</p>
      </div>
    </div>
)};

export default CardProduct;

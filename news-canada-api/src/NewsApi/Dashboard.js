import { useEffect, useState } from "react"
import axios from "axios";

// for error handling tailwind library
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [newsData, setNewsData] = useState([]);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState('');

    const [open, setOpen] = useState(true)

  useEffect(() => {
    axios.get('./news.json')
    .then((result) => {
      setNewsData(result.data.articles);
      setLoad(false);
      console.log(result.data);
    })
    .catch((error) => {
      console.log(error);
      setLoad(false)
      setErr(error);
    })
  }, []);
  return(
    <>
      {/* <h1>Dashboard</h1> */}
      <div className="flex justify-center m-4 p-6">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {load && <p>Loading...</p>}
        {err && (
          <>
            {/* tailwind library */}
            <div>
              <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                      transition
                      className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                            <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                              Error
                            </DialogTitle>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">{err.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => window.location.reload()}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Reload
                        </button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            </div>
          </>
        )}
        {!load && newsData.length > 0 && (
          newsData.map((article, index) => (
          <div key={index} className="max-w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href={article.url} target="_blank" rel="noopener noreferrer"> {/* open link with a new tab */}
              <img 
                className="rounded-t-lg" 
                src={article.urlToImage ? article.urlToImage : 'https://dummyimage.com/600x400/808080/fff&text=No Image'} 
                alt={article.title || "News image"} />
            </a>
            <div className="p-5">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
            </div>
          </div>
          ))
        )}
        </div>
      </div>
    </>
  )
}

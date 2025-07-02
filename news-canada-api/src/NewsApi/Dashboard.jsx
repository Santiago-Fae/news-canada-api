import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsContext } from './NewsContext';

// for error handling tailwind library
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Article from "./Article";
import ClassArticle from "./ClassArticle";
import ClassSpecialArticle from "./ClassSpecialArticle";


export default function Dashboard() {
  const { newsData, load, err, open, setOpen, category, setCategory, getNews } = useContext(NewsContext)

  useEffect(() => {
    getNews(category); //NewsContext.js
  }, [category]);
  return(
    <>
      Select Category
      <form className="max-w-sm mx-auto">
        <select value={category} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setCategory(e.target.value)}
          >
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="general">general</option>
          <option value="health">health</option>
          <option value="science">science</option>
          <option value="sports">sports</option>
          <option value="technology">technology</option>
        </select>
      </form>

      {/* News Articles List */}
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
          newsData.map((article, index) => {
            var newArticle
            if(article.urlToImage){
              newArticle = new ClassArticle(article);
            }else{
              newArticle = new ClassSpecialArticle(article);
            }
            return newArticle.display(index);
          })
        )}
        </div>
      </div>
    </>
  )
}

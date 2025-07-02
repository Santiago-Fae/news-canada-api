import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { NewsContext } from './NewsContext';

export default function Article() {
  const { url } = useParams();
  const decoded = atob(url);  //(Base64 → URL)
  const { newsData } = useContext(NewsContext)
  
  const article = newsData.find(element => element.url === decoded)
    //check newsData one by one as element, if element.url = decoded url, return the value

  return(
    <>
    {!article ? ( //there is no article found
      <p className="text-center mt-10 text-gray-500">Article not found.</p>
    ) : (
    //tailwind template
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      {/* source */}
      <div className="flex flex-wrap text-sm text-gray-500 mb-4 gap-4">
        {article.author && <p>By <span className="font-medium text-gray-700">{article.author}</span></p>}
        {article.publishedAt && <p>{new Date(article.publishedAt).toLocaleDateString()}</p>}
        {article.source?.name && <p>Source: {article.source.name}</p>}
      </div>
      {/* image */}
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-auto rounded-xl mb-6 object-cover"
        />
      )}
      {/* description */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {article.description || "No description available."}
      </p>
      {/* body */}
      {article.content && (
        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
          {article.content}
        </p>
      )}
      {/* link */}
      <a
        href={article.url}
        target="_blank" //open with a new tab
        rel="noopener noreferrer"
        className="inline-block text-blue-600 hover:text-blue-800 font-semibold underline"
      >
        ▶ Read Full Article
      </a>
    </div>
    )}
    </>
  )
}
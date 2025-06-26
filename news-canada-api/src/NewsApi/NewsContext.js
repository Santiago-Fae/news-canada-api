import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const NewsContext = createContext();

export default function NewsProvider({children}) {
  const [newsData, setNewsData] = useState([]);
  const [load, setLoad] = useState(true);
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(true);
  const [category, setCategory] = useState('business');
  const apiKey = process.env.REACT_APP_API_KEY;
  
  const getNews = async(category) => {
    axios.get(`https://newsapi.org/v2/top-headlines?sortBy=popularity&apiKey=${apiKey}&category=${category}`)
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
  };

  return(
    <NewsContext.Provider value={{ newsData, load, err, open, setOpen, category, setCategory, getNews }}>
      {children}
    </NewsContext.Provider>
  )
}
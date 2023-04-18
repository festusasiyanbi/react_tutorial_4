import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
 
    useEffect(() => {
        setPosts(data)
      }, [data])
    
      useEffect(() => {
        const filteredResults = posts.filter(post => ((post.title).toLowerCase()).includes(search.toLowerCase())
         || ((post.body).toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults);
      }, [posts, search])

   return (
       <DataContext.Provider value = {{ 
          posts, setPosts, search, setSearch, 
          searchResults, setSearchResults, fetchError, isLoading
       }}>

           { children }
       </DataContext.Provider>
   )
}

export default DataContext;
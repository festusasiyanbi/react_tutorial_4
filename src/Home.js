import { useContext } from 'react';
import DataContext from './context/DataContext';
import Feed from './Feed';

const Home = () => {
   const { posts, isLoading, fetchError } = useContext(DataContext);
  return (
        <main className="Home">
            {isLoading && <p className='statusMsg'>Loading items... </p>}
            {!isLoading && fetchError && <p className='statusMsg' style={{ color: "red" }}> {fetchError} </p>}
            {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className='statusMsg' style={{ marginTop: "2rem" }}>No posts to display</p>
            )}
        </main>
    )
}

export default Home;

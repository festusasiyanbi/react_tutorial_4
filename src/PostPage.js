import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "./context/DataContext";
import api from './api/posts';

const PostPage = () => {
    const { posts, setPosts } = useContext(DataContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    const handleDelete = async (id) => {
        try {
          await api.delete(`/posts/${id}`);
          const postsList = posts.filter(post => post.id !== id);
          setPosts(postsList);
          navigate('/');
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }

  return (
    <main className="PostPage">
        <article className="post">
            {post && 
                <>
                    <h2>{post.title}</h2>
                    <p>{post.datetime}</p>
                    <p>{post.body}</p>
                    <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                    <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                        Delete Post
                    </button>
                </>
            }
            {!post && 
                <>
                    <h2>Post not found</h2>
                    <p>Well, that's quite disappointing.</p>
                    <p>
                        <Link to='/'>Visit our homepage</Link>
                    </p>
                </>
            
            }
        </article>
    </main>
  )
}

export default PostPage;

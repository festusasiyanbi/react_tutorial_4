import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';
import DataContext from './context/DataContext';

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find(post => (post.id).toString() === id);

    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        try {
          const response = await api.put(`/posts/${id}`, updatedPost);
          setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
          setEditTitle('');
          setEditBody('');
          navigate('/');
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
      }

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className='NewPost'>
            {editTitle && 
                <>
                    <h2> Edit Post </h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="editTitle"> Title: </label>
                    <input 
                            id='postTitle'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />

                    <label htmlFor="postBody"> Body: </label>
                    <textarea 
                            id='postBody'
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            required
                    />
                    <button type='submit' onClick={() => handleEdit(post.id)}> Submit </button>
                    </form>
                </>
            }
            {!editTitle && 
                <>
                    <h2>Post not found</h2>
                    <p>Well, that's quite disappointing.</p>
                    <p>
                        <Link to='/'>Visit our homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}
export default EditPost;
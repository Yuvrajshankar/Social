import React, { useEffect, useState } from 'react';
import "./Main.css";
import Post from '../Post/Post';
import axios from 'axios';
import { useAuth } from '../../Context/authContext';

function Main() {
    const [postss, setPostss] = useState([]);
    const [{ user: authUser, posts }, dispatch] = useAuth();
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState({
        description: "",
        image: "",
    });

    // console.log(authUser, posts);

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setPostData({ ...postData, image: selectedImage });
        }
    };

    const createPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('description', postData.description);
            formData.append('image', postData.image);

            const response = await axios.post("/post/create", formData, {
                withCredentials: true,
            });

            dispatch({ type: "SET_POSTS", payload: { posts: [response.data, ...posts] } });
            setLoading(false);

            setPostData({
                description: "",
                image: ""
            });

            document.getElementById("fileInput").value = "";

            fetchPosts();
        } catch (error) {
            console.error('Post Creation Failed:', error);
            setLoading(false);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get("/post", { withCredentials: true });
            setPostss(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="main">
            <form className="input" onSubmit={createPost}>
                <div className="img">
                    {authUser && <img src={authUser.user.profileImage} alt="profile-img" />}

                    <input type="text"
                        placeholder="What's in your mind..."
                        name='description'
                        onChange={handleChange}
                        value={postData.description}
                        required />
                </div>

                <div className="input12">
                    <input type="file" id="fileInput" name="image" accept="image/*" onChange={handleImageChange} required />
                    <button type="submit" disabled={loading}>{loading ? "..." : "POST"}</button>
                </div>
            </form>

            {postss.slice(0).reverse().map(post => (
                <Post
                    key={post._id}
                    userId={post.userId}
                    image={post.profileImage}
                    username={post.userName}
                    country={post.country}
                    summary={post.description}
                    likes={post.likes.length}
                    comments="0"
                    postId={post._id}
                    post={post.image}
                    authUser={authUser}
                />
            ))}
        </div>
    )
}

export default Main;

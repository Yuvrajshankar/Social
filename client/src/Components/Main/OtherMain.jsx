import React, { useEffect, useState } from 'react';
import "./Main.css";
import Post from '../Post/Post';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OtherMain() {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`/post/${id}`, { withCredentials: true });
            // console.log(response.data);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [id]);

    return (
        <div className="main" style={{ marginTop: "100px" }}>
            {posts.slice(0).reverse().map(post => (
                <Post
                    key={post._id}
                    userId={post.userId}
                    image={post.profileImage}
                    username={post.userName}
                    country={post.country}
                    summary={post.description}
                    likes={post.likes.length}
                    comments="0"
                    post={post.image}
                />
            ))}
        </div>
    )
}

export default OtherMain;

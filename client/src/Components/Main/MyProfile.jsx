import React, { useEffect, useState } from 'react'
import Post from '../Post/Post';
import axios from "axios";

function MyProfile() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`/post/posts`, { withCredentials: true });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

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

export default MyProfile

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReelFeed from "../../components/ReelFeed";
import { useNavigate } from "react-router-dom";  // ← Ye add karna zaroori

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // ← Navigation ke liye

  useEffect(() => {
    const fetchVideosAndCheckAuth = async () => {
      try {
        const response = await axios.get("/api/food", {
          withCredentials: true,
        });

        // Agar videos aa gaye → user logged in hai
        setVideos(response.data.foodItems || []);
        setLoading(false);
      } catch (error) {
        // Agar error aaya (401 unauthorized ya kuch) → user logged in nahi
        console.log("User not logged in or error:", error.response?.status);
        navigate("/login");  // ← Login page pe bhej do
      }
    };

    fetchVideosAndCheckAuth();
  }, [navigate]);

  // Like aur Save functions (tera wahi)
  const likeVideo = async (item) => {
    try {
      const res = await axios.post(
        "/api/food/like",
        { foodId: item._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, likeCount: res.data.like ? v.likeCount + 1 : v.likeCount - 1 }
            : v
        )
      );
    } catch (err) {
      console.log("Like error:", err.response?.data || err.message);
    }
  };

  const saveVideo = async (item) => {
    try {
      const res = await axios.post(
        "/api/food/save",
        { foodId: item._id },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                savesCount: res.data.save ? v.savesCount + 1 : v.savesCount - 1,
              }
            : v
        )
      );
    } catch (err) {
      console.log("Save error:", err.response?.data || err.message);
    }
  };

  // Ye function ReelFeed ko pass kar denge
  const handleVisitProfile = (partnerId) => {
    navigate(`/foodpartner/${partnerId}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontSize: "20px" }}>
        Loading videos...
      </div>
    );
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      onVisitProfile={handleVisitProfile}  // ← Naya prop pass kar rahe hain
      emptyMessage="No videos available."
    />
  );
};

export default Home;
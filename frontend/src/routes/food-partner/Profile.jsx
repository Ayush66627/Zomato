import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/profile.css";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  const BACKEND_URL = "https://zomato-clone-2blv.onrender.com";

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${BACKEND_URL}/api/foodpartner/${id}`, {  // ← full URL ya proxy use kar
        withCredentials: true,
        timeout: 30000,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems || []);
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid food partner ID");
      });
  }, [id]);

  
  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">
          

          <div className="profile-info">
            <h1 className="profile-pill profile-business" title="Business name">
              Name: {profile?.businessName}
            </h1>
            <p className="profile-pill profile-address" title="Address">
              Address: {profile?.address}
            </p>
          </div>
        </div>

        <div className="profile-stats" role="list" aria-label="Stats">
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">Total Meals Added</span>
            <span className="profile-stat-value">{profile?.totalMeals}</span>
          </div>
        
        </div>
      </section>

      <hr className="profile-sep" />

      <section className="profile-grid" aria-label="Videos">
        {videos.map((v) => (
          <div key={v._id} className="profile-grid-item">
            <video
              className="profile-grid-video"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={v.video}
              muted
            ></video>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;

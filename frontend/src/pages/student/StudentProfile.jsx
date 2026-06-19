import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { updateStudentProfile } from "../../services/studentService";

function StudentProfile() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    phone: "",
    linkedin_url: "",
    github_url: "",
    skills: "",
    bio: "",
    resume_url: "",
    profile_picture: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudentProfile({
        clerkId: user.id,
        ...formData,
      });

      alert("Profile Updated");
    } catch (error) {
      console.error(error);

      alert("Update Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="linkedin_url"
          placeholder="LinkedIn URL"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="github_url"
          placeholder="GitHub URL"
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea name="skills" placeholder="Skills" onChange={handleChange} />

        <br />
        <br />

        <textarea name="bio" placeholder="Bio" onChange={handleChange} />

        <br />
        <br />

        <input
          type="text"
          name="resume_url"
          placeholder="Resume URL"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default StudentProfile;

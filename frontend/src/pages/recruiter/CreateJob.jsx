import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { createJob } from "../../services/jobService";

function CreateJob() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    job_type: "",
    location: "",
    ctc: "",
    min_cgpa: "",
    max_backlogs: "",
    application_deadline: "",
    eligible_departments: "",
    openings: "",
    company_name: "",
    selection_process: "",
    job_description: "",
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
      await createJob({
        clerkId: user.id,
        ...formData,
      });

      alert("Job Created Successfully");

      setFormData({
        title: "",
        job_type: "",
        location: "",
        ctc: "",
        min_cgpa: "",
        max_backlogs: "",
        application_deadline: "",
        eligible_departments: "",
        openings: "",
        company_name: "",
        selection_process: "",
        job_description: "",
      });
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Job</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="job_type"
          placeholder="Job Type"
          value={formData.job_type}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="ctc"
          placeholder="CTC"
          value={formData.ctc}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="min_cgpa"
          placeholder="Minimum CGPA"
          value={formData.min_cgpa}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="max_backlogs"
          placeholder="Maximum Backlogs"
          value={formData.max_backlogs}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="date"
          name="application_deadline"
          value={formData.application_deadline}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="eligible_departments"
          placeholder="AEI,CSE,ECE"
          value={formData.eligible_departments}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="openings"
          placeholder="Openings"
          value={formData.openings}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="selection_process"
          placeholder="Selection Process"
          value={formData.selection_process}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          rows="5"
          cols="50"
          name="job_description"
          placeholder="Job Description"
          value={formData.job_description}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}

export default CreateJob;

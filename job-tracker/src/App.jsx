import { useState, useEffect } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

   const [applications, setApplications] = useState(() => {
  const savedData = localStorage.getItem("applications");
  return savedData ? JSON.parse(savedData) : [];
}); 

 useEffect(() => {
  localStorage.setItem(
    "applications",
    JSON.stringify(applications)
  );
}, [applications]);

  const addApplication = () => {
    const newApplication = {
      company,
      role,
      status,
    };

   setApplications([
  ...applications,
  newApplication,
]);
   
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <br /><br />

      <button onClick={addApplication}>
        Add Application
      </button>

      <hr />
    {applications.map((app, index) => (
  <div key={index}>
    <h3>{app.company}</h3>

    <p>{app.role}</p>

    <p>{app.status}</p>

    <button
      onClick={() =>
        setApplications(
          applications.filter(
            (_, i) => i !== index
          )
        )
      }
    >
      Delete
    </button>

    <hr />
  </div>
))}
    </div>
  );
}

export default App;
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

   const [applications, setApplications] = useState(() => {
  const savedData = localStorage.getItem("applications");
  return savedData ? JSON.parse(savedData) : [];
}); 
const [search, setSearch] = useState("");

 useEffect(() => {
  localStorage.setItem(
    "applications",
    JSON.stringify(applications)
  );
}, [applications]);

  const addApplication = () => {
   if (company.trim() === "" || role.trim() === "") {
  alert("Please fill all fields");
  return;
}
    const newApplication = {
      company,
      role,
      status,
      date: new Date().toLocaleDateString(),

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
      <h2>📊 Total Applications: {applications.length}</h2>
      <h3>🔍 Search Applications</h3>

    <input
  type="text"
  placeholder="Search Company"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      <hr />
        {applications.length === 0 && (
  <p>No applications added yet.</p>
)}

    {applications
  .filter((app) =>
    app.company.toLowerCase().includes(search.toLowerCase())
  )
  .map((app, index) => (
  <div key={index} className="app-card">
    <h3>{app.company}</h3>

    <p>{app.role}</p>

    <p
  style={{
    color:
      app.status === "Offer"
        ? "green"
        : app.status === "Rejected"
        ? "red"
        : app.status === "Interview"
        ? "orange"
        : "blue",
    fontWeight: "bold",
  }}
>
  {app.status}
</p>
    <p>Applied On: {app.date}</p>

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

       <button
  onClick={() => {
    setCompany(app.company);
    setRole(app.role);
    setStatus(app.status);

    setApplications(
      applications.filter((_, i) => i !== index)
    );
  }}
>
  Edit
</button>
    <hr />
  </div>
))}
    </div>
  );
}

export default App;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/StepIndicator";
import type { PortfolioData, Experience, Education, Project } from "../types";
import { emptyExperience, emptyEducation, emptyProject } from "../types";

interface FormPageProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

export default function FormPage({ data, onChange }: FormPageProps) {
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState("");

  const update = (field: keyof PortfolioData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateSocial = (field: string, value: string) => {
    onChange({ ...data, socials: { ...data.socials, [field]: value } });
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!data.skills.includes(skillInput.trim())) {
        update("skills", [...data.skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", data.skills.filter((s) => s !== skill));
  };

  const addExperience = () => update("experience", [...data.experience, emptyExperience()]);
  const removeExperience = (i: number) =>
    update("experience", data.experience.filter((_, idx) => idx !== i));
  const updateExperience = (i: number, field: keyof Experience, value: string) => {
    const items = [...data.experience];
    items[i] = { ...items[i], [field]: value };
    update("experience", items);
  };

  const addEducation = () => update("education", [...data.education, emptyEducation()]);
  const removeEducation = (i: number) =>
    update("education", data.education.filter((_, idx) => idx !== i));
  const updateEducation = (i: number, field: keyof Education, value: string) => {
    const items = [...data.education];
    items[i] = { ...items[i], [field]: value };
    update("education", items);
  };

  const addProject = () => update("projects", [...data.projects, emptyProject()]);
  const removeProject = (i: number) =>
    update("projects", data.projects.filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, value: any) => {
    const items = [...data.projects];
    items[i] = { ...items[i], [field]: value };
    update("projects", items);
  };

  const addProjectTech = (projIdx: number, tech: string) => {
    if (!tech.trim()) return;
    const items = [...data.projects];
    if (!items[projIdx].tech.includes(tech.trim())) {
      items[projIdx] = { ...items[projIdx], tech: [...items[projIdx].tech, tech.trim()] };
      update("projects", items);
    }
  };

  const removeProjectTech = (projIdx: number, tech: string) => {
    const items = [...data.projects];
    items[projIdx] = {
      ...items[projIdx],
      tech: items[projIdx].tech.filter((t) => t !== tech),
    };
    update("projects", items);
  };

  const isValid =
    data.name.trim() &&
    data.title.trim() &&
    data.email.trim() &&
    data.about.trim();

  return (
    <div className="page">
      <div className="container">
        <StepIndicator current={1} />
        <div className="page-header">
          <h1>Tell us about yourself</h1>
          <p>Fill in your portfolio details</p>
        </div>

        {/* Personal Info */}
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
            </div>
            <div className="form-group">
              <label>Title *</label>
              <input value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="Full Stack Developer" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input value={data.phone || ""} onChange={(e) => update("phone", e.target.value)} placeholder="+1 555 123 4567" />
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input value={data.location || ""} onChange={(e) => update("location", e.target.value)} placeholder="San Francisco, CA" />
          </div>
          <div className="form-group">
            <label>About *</label>
            <textarea value={data.about} onChange={(e) => update("about", e.target.value)} placeholder="Write a short bio about yourself..." rows={3} />
          </div>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h2>Skills</h2>
          <div className="tags-input">
            {data.skills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
                <button onClick={() => removeSkill(skill)}>×</button>
              </span>
            ))}
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Type a skill and press Enter"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="form-section">
          <h2>Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="array-item">
              <div className="array-item-header">
                <span className="array-item-title">Experience {i + 1}</span>
                <button className="btn btn-danger" onClick={() => removeExperience(i)}>Remove</button>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Company</label>
                  <input value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Acme Inc" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Senior Engineer" />
                </div>
              </div>
              <div className="form-group">
                <label>Period</label>
                <input value={exp.period} onChange={(e) => updateExperience(i, "period", e.target.value)} placeholder="2022 — Present" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} placeholder="What did you work on?" rows={2} />
              </div>
            </div>
          ))}
          <button className="btn btn-add" onClick={addExperience}>+ Add Experience</button>
        </div>

        {/* Education */}
        <div className="form-section">
          <h2>Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="array-item">
              <div className="array-item-header">
                <span className="array-item-title">Education {i + 1}</span>
                <button className="btn btn-danger" onClick={() => removeEducation(i)}>Remove</button>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>School</label>
                  <input value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} placeholder="UC Berkeley" />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} placeholder="B.S. Computer Science" />
                </div>
              </div>
              <div className="form-group">
                <label>Period</label>
                <input value={edu.period} onChange={(e) => updateEducation(i, "period", e.target.value)} placeholder="2016 — 2020" />
              </div>
            </div>
          ))}
          <button className="btn btn-add" onClick={addEducation}>+ Add Education</button>
        </div>

        {/* Projects */}
        <div className="form-section">
          <h2>Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="array-item">
              <div className="array-item-header">
                <span className="array-item-title">Project {i + 1}</span>
                <button className="btn btn-danger" onClick={() => removeProject(i)}>Remove</button>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Project Name</label>
                  <input value={proj.name} onChange={(e) => updateProject(i, "name", e.target.value)} placeholder="TaskFlow" />
                </div>
                <div className="form-group">
                  <label>URL</label>
                  <input value={proj.url || ""} onChange={(e) => updateProject(i, "url", e.target.value)} placeholder="https://github.com/..." />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={proj.description} onChange={(e) => updateProject(i, "description", e.target.value)} placeholder="What does this project do?" rows={2} />
              </div>
              <div className="form-group">
                <label>Tech Stack</label>
                <div className="tags-input">
                  {proj.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                      <button onClick={() => removeProjectTech(i, t)}>×</button>
                    </span>
                  ))}
                  <input
                    placeholder="Add tech, press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addProjectTech(i, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-add" onClick={addProject}>+ Add Project</button>
        </div>

        {/* Socials */}
        <div className="form-section">
          <h2>Social Links</h2>
          <div className="form-row">
            <div className="form-group">
              <label>GitHub</label>
              <input value={data.socials.github || ""} onChange={(e) => updateSocial("github", e.target.value)} placeholder="https://github.com/username" />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input value={data.socials.linkedin || ""} onChange={(e) => updateSocial("linkedin", e.target.value)} placeholder="https://linkedin.com/in/username" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Twitter</label>
              <input value={data.socials.twitter || ""} onChange={(e) => updateSocial("twitter", e.target.value)} placeholder="https://twitter.com/username" />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input value={data.socials.website || ""} onChange={(e) => updateSocial("website", e.target.value)} placeholder="https://yoursite.com" />
            </div>
          </div>
        </div>

        <div className="page-actions">
          <div />
          <button
            className="btn btn-primary"
            disabled={!isValid}
            onClick={() => navigate("/template")}
          >
            Next: Pick Template →
          </button>
        </div>
      </div>
    </div>
  );
}

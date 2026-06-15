import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StepIndicator from "../components/StepIndicator";
import { saveProfile } from "../api";
import type { PortfolioData, Experience, Education, Project } from "../types";
import { emptyExperience, emptyEducation, emptyProject } from "../types";

interface FormPageProps {
  data: PortfolioData;
  onChange: (data: PortfolioData) => void;
}

const inputCls =
  "px-3 py-2.5 border border-border rounded-sm bg-cream text-charcoal placeholder:text-muted focus:outline-none focus:border-blue-500/50 focus:ring-3 focus:ring-blue-500/15 transition-[box-shadow,border-color]";

export default function FormPage({ data, onChange }: FormPageProps) {
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const handleSaveAsProfile = async () => {
    setSavingProfile(true);
    try {
      await saveProfile(data);
      toast.success("Saved as profile!");
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSavingProfile(false);
    }
  };

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
    <div className="py-6 pb-[60px] flex-1">
      <div className="max-w-[1200px] mx-auto px-6">
        <StepIndicator current={1} />
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-semibold mb-2 tracking-[-0.5px]">Tell us about yourself</h1>
          <p className="text-muted">Fill in your portfolio details</p>
        </div>

        {/* Personal Info */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-5">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">Full Name *</label>
              <input className={inputCls} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">Title *</label>
              <input className={inputCls} value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="Full Stack Developer" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">Email *</label>
              <input className={inputCls} type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">Phone</label>
              <input className={inputCls} value={data.phone || ""} onChange={(e) => update("phone", e.target.value)} placeholder="+1 555 123 4567" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-sm text-charcoal">Location</label>
            <input className={inputCls} value={data.location || ""} onChange={(e) => update("location", e.target.value)} placeholder="San Francisco, CA" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-charcoal">About *</label>
            <textarea
              className={`${inputCls} resize-y min-h-20`}
              value={data.about}
              onChange={(e) => update("about", e.target.value)}
              placeholder="Write a short bio about yourself..."
              rows={3}
            />
          </div>
        </div>

        {/* Skills */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-5">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">Skills</h2>
          <div className="flex flex-wrap gap-2 p-2 border border-border rounded-sm bg-cream min-h-[44px] items-center focus-within:border-blue-500/50 focus-within:ring-3 focus-within:ring-blue-500/15 transition-[box-shadow,border-color]">
            {data.skills.map((skill) => (
              <span key={skill} className="flex items-center gap-1 px-2.5 py-1 bg-charcoal/[0.04] rounded-full text-[13px]">
                {skill}
                <button
                  className="bg-none border-none text-muted text-base leading-none p-0 hover:text-charcoal transition-colors cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className="border-none outline-none bg-transparent flex-1 min-w-[120px] text-sm text-charcoal placeholder:text-muted"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Type a skill and press Enter"
            />
          </div>
        </div>

        {/* Experience */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-5">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="bg-cream border border-border rounded-sm p-4 mb-3">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-muted">Experience {i + 1}</span>
                <button
                  className="bg-error-bg text-error px-3 py-1.5 text-sm rounded-sm hover:bg-error hover:text-white transition-colors cursor-pointer border-none"
                  onClick={() => removeExperience(i)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-charcoal">Company</label>
                  <input className={inputCls} value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Acme Inc" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-charcoal">Role</label>
                  <input className={inputCls} value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Senior Engineer" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-sm text-charcoal">Period</label>
                <input className={inputCls} value={exp.period} onChange={(e) => updateExperience(i, "period", e.target.value)} placeholder="2022 — Present" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Description</label>
                <textarea className={`${inputCls} resize-y min-h-20`} value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} placeholder="What did you work on?" rows={2} />
              </div>
            </div>
          ))}
          <button
            className="w-full border border-border-interactive text-charcoal text-sm p-2.5 rounded-sm hover:opacity-80 transition-opacity cursor-pointer bg-transparent"
            onClick={addExperience}
          >
            + Add Experience
          </button>
        </div>

        {/* Education */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-5">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="bg-cream border border-border rounded-sm p-4 mb-3">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-muted">Education {i + 1}</span>
                <button
                  className="bg-error-bg text-error px-3 py-1.5 text-sm rounded-sm hover:bg-error hover:text-white transition-colors cursor-pointer border-none"
                  onClick={() => removeEducation(i)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-charcoal">School</label>
                  <input className={inputCls} value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} placeholder="UC Berkeley" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-charcoal">Degree</label>
                  <input className={inputCls} value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} placeholder="B.S. Computer Science" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Period</label>
                <input className={inputCls} value={edu.period} onChange={(e) => updateEducation(i, "period", e.target.value)} placeholder="2016 — 2020" />
              </div>
            </div>
          ))}
          <button
            className="w-full border border-border-interactive text-charcoal text-sm p-2.5 rounded-sm hover:opacity-80 transition-opacity cursor-pointer bg-transparent"
            onClick={addEducation}
          >
            + Add Education
          </button>
        </div>

        {/* Projects */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-5">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">Projects</h2>
          {data.projects.map((proj, i) => (
            <div key={i} className="bg-cream border border-border rounded-sm p-4 mb-3">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-muted">Project {i + 1}</span>
                <button
                  className="bg-error-bg text-error px-3 py-1.5 text-sm rounded-sm hover:bg-error hover:text-white transition-colors cursor-pointer border-none"
                  onClick={() => removeProject(i)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-charcoal">Project Name</label>
                  <input className={inputCls} value={proj.name} onChange={(e) => updateProject(i, "name", e.target.value)} placeholder="TaskFlow" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-charcoal">URL</label>
                  <input className={inputCls} value={proj.url || ""} onChange={(e) => updateProject(i, "url", e.target.value)} placeholder="https://github.com/..." />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-4">
                <label className="text-sm text-charcoal">Description</label>
                <textarea className={`${inputCls} resize-y min-h-20`} value={proj.description} onChange={(e) => updateProject(i, "description", e.target.value)} placeholder="What does this project do?" rows={2} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Tech Stack</label>
                <div className="flex flex-wrap gap-2 p-2 border border-border rounded-sm bg-cream min-h-[44px] items-center focus-within:border-blue-500/50 focus-within:ring-3 focus-within:ring-blue-500/15 transition-[box-shadow,border-color]">
                  {proj.tech.map((t) => (
                    <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-charcoal/[0.04] rounded-full text-[13px]">
                      {t}
                      <button
                        className="bg-none border-none text-muted text-base leading-none p-0 hover:text-charcoal transition-colors cursor-pointer"
                        onClick={() => removeProjectTech(i, t)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    className="border-none outline-none bg-transparent flex-1 min-w-[120px] text-sm text-charcoal placeholder:text-muted"
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
          <button
            className="w-full border border-border-interactive text-charcoal text-sm p-2.5 rounded-sm hover:opacity-80 transition-opacity cursor-pointer bg-transparent"
            onClick={addProject}
          >
            + Add Project
          </button>
        </div>

        {/* Socials */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-5">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">GitHub</label>
              <input className={inputCls} value={data.socials.github || ""} onChange={(e) => updateSocial("github", e.target.value)} placeholder="https://github.com/username" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">LinkedIn</label>
              <input className={inputCls} value={data.socials.linkedin || ""} onChange={(e) => updateSocial("linkedin", e.target.value)} placeholder="https://linkedin.com/in/username" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">Twitter</label>
              <input className={inputCls} value={data.socials.twitter || ""} onChange={(e) => updateSocial("twitter", e.target.value)} placeholder="https://twitter.com/username" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-charcoal">Website</label>
              <input className={inputCls} value={data.socials.website || ""} onChange={(e) => updateSocial("website", e.target.value)} placeholder="https://yoursite.com" />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-8">
          <button
            className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-sm hover:opacity-80 transition-opacity"
            onClick={handleSaveAsProfile}
            disabled={savingProfile}
          >
            {savingProfile ? "Saving..." : "Save as Profile"}
          </button>
          <button
            className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 transition-opacity disabled:bg-border disabled:text-muted disabled:shadow-none disabled:opacity-100 disabled:cursor-not-allowed"
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

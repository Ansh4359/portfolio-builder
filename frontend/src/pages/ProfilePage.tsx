import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchProfile, saveProfile, uploadResume } from "../api";
import type { PortfolioData, Experience, Education, Project } from "../types";
import { emptyPortfolio, emptyExperience, emptyEducation, emptyProject } from "../types";

const inputCls =
  "px-3 py-2.5 border border-border rounded-sm bg-cream text-charcoal placeholder:text-muted focus:outline-none focus:border-blue-500/50 focus:ring-3 focus:ring-blue-500/15 transition-[box-shadow,border-color]";

interface ProfilePageProps {
  onProfileSave?: (data: PortfolioData) => void;
}

export default function ProfilePage({ onProfileSave }: ProfilePageProps) {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<PortfolioData | null>(null);
  const [editData, setEditData] = useState<PortfolioData>(emptyPortfolio());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    fetchProfile()
      .then((p) => {
        if (p) {
          setProfile(p);
          setEditData(p);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const update = (field: keyof PortfolioData, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocial = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      socials: { ...prev.socials, [field]: value },
    }));
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!editData.skills.includes(skillInput.trim())) {
        update("skills", [...editData.skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", editData.skills.filter((s) => s !== skill));
  };

  const addExperience = () => update("experience", [...editData.experience, emptyExperience()]);
  const removeExperience = (i: number) =>
    update("experience", editData.experience.filter((_, idx) => idx !== i));
  const updateExperience = (i: number, field: keyof Experience, value: string) => {
    const items = [...editData.experience];
    items[i] = { ...items[i], [field]: value };
    update("experience", items);
  };

  const addEducation = () => update("education", [...editData.education, emptyEducation()]);
  const removeEducation = (i: number) =>
    update("education", editData.education.filter((_, idx) => idx !== i));
  const updateEducation = (i: number, field: keyof Education, value: string) => {
    const items = [...editData.education];
    items[i] = { ...items[i], [field]: value };
    update("education", items);
  };

  const addProject = () => update("projects", [...editData.projects, emptyProject()]);
  const removeProject = (i: number) =>
    update("projects", editData.projects.filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, value: any) => {
    const items = [...editData.projects];
    items[i] = { ...items[i], [field]: value };
    update("projects", items);
  };

  const addProjectTech = (projIdx: number, tech: string) => {
    if (!tech.trim()) return;
    const items = [...editData.projects];
    if (!items[projIdx].tech.includes(tech.trim())) {
      items[projIdx] = { ...items[projIdx], tech: [...items[projIdx].tech, tech.trim()] };
      update("projects", items);
    }
  };

  const removeProjectTech = (projIdx: number, tech: string) => {
    const items = [...editData.projects];
    items[projIdx] = {
      ...items[projIdx],
      tech: items[projIdx].tech.filter((t) => t !== tech),
    };
    update("projects", items);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile(editData);
      setProfile(editData);
      setEditing(false);
      setParsed(false);
      onProfileSave?.(editData);
      toast.success("Profile saved!");
      navigate("/template");
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large (max 5MB)");
      return;
    }

    setParsing(true);
    setFileName(file.name);
    try {
      const data = await uploadResume(file);
      setEditData(data);
      setParsed(true);
      setEditing(true);
      toast.success("Resume parsed! Review and save.");
    } catch (err: any) {
      toast.error(err.message || "Failed to parse resume");
      setFileName("");
    } finally {
      setParsing(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="py-6 pb-[60px] flex-1 animate-fade-in">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-6">
            <div className="skeleton h-8 w-40 mx-auto mb-2" />
            <div className="skeleton h-4 w-48 mx-auto" />
          </div>
          <div className="bg-cream border border-border rounded-xl p-6 mb-5">
            <div className="skeleton h-5 w-32 mb-5" />
            <div className="flex items-center gap-4">
              <div className="skeleton h-9 w-28" />
              <div className="skeleton h-4 w-32" />
            </div>
          </div>
          <div className="bg-cream border border-border rounded-xl p-6 mb-5">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-border">
              <div className="skeleton h-5 w-28" />
              <div className="skeleton h-8 w-16" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="skeleton h-3 w-16 mb-2" />
                  <div className="skeleton h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 pb-[60px] flex-1 animate-fade-in">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-6">
          <h1 className="text-[28px] font-semibold mb-2 tracking-[-0.5px]">Your Profile</h1>
          <p className="text-muted">Manage your portfolio details</p>
        </div>

        {/* Resume Upload Section */}
        <div className="bg-cream border border-border rounded-xl p-6 mb-5 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
          <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">
            Upload Resume (Optional)
          </h2>
          <p className="text-sm text-muted mb-4">
            Upload your resume and let AI extract your details automatically. You can review and
            edit before saving.
          </p>
          <div className="flex items-center gap-4">
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-sm hover:opacity-80 active:scale-[0.98] transition-all"
              onClick={() => fileRef.current?.click()}
              disabled={parsing}
            >
              {parsing ? "Parsing..." : "Choose File"}
            </button>
            {fileName && <span className="text-sm text-muted">{fileName}</span>}
          </div>
          {parsing && (
            <div className="flex items-center gap-3 mt-4">
              <div className="w-5 h-5 border-2 border-border border-t-charcoal rounded-full animate-spin" />
              <span className="text-sm text-muted">AI is parsing your resume...</span>
            </div>
          )}
        </div>

        {/* Profile View / Edit */}
        {!editing && profile ? (
          /* Read-only view */
          <div className="bg-cream border border-border rounded-xl p-6 mb-5 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-border">
              <h2 className="text-lg font-semibold">Profile Details</h2>
              <button
                className="bg-charcoal text-cream-light px-4 py-1.5 rounded-sm text-sm shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div><span className="text-sm text-muted">Name</span><p>{profile.name || "—"}</p></div>
              <div><span className="text-sm text-muted">Title</span><p>{profile.title || "—"}</p></div>
              <div><span className="text-sm text-muted">Email</span><p>{profile.email || "—"}</p></div>
              <div><span className="text-sm text-muted">Phone</span><p>{profile.phone || "—"}</p></div>
              <div><span className="text-sm text-muted">Location</span><p>{profile.location || "—"}</p></div>
            </div>
            {profile.about && (
              <div className="mb-4">
                <span className="text-sm text-muted">About</span>
                <p className="mt-1">{profile.about}</p>
              </div>
            )}
            {profile.skills.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-muted">Skills</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-charcoal/[0.04] rounded-full text-[13px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {profile.experience.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-muted">Experience</span>
                {profile.experience.map((exp, i) => (
                  <div key={i} className="mt-2 p-3 border border-border rounded-sm">
                    <p className="font-medium">{exp.role} at {exp.company}</p>
                    <p className="text-sm text-muted">{exp.period}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button
                className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all"
                onClick={() => navigate("/template")}
              >
                Choose Template
              </button>
            </div>
          </div>
        ) : (
          /* Edit form */
          <div className="bg-cream border border-border rounded-xl p-6 mb-5 hover:border-border-interactive hover:shadow-card-hover transition-all duration-200">
            <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-border">
              {parsed ? "Review Parsed Data" : "Edit Profile"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Name</label>
                <input className={inputCls} value={editData.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Title</label>
                <input className={inputCls} value={editData.title} onChange={(e) => update("title", e.target.value)} placeholder="Full Stack Developer" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Email</label>
                <input className={inputCls} value={editData.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Phone</label>
                <input className={inputCls} value={editData.phone || ""} onChange={(e) => update("phone", e.target.value)} placeholder="+1 555 123 4567" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-charcoal">Location</label>
                <input className={inputCls} value={editData.location || ""} onChange={(e) => update("location", e.target.value)} placeholder="San Francisco, CA" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-sm text-charcoal">About</label>
              <textarea className={`${inputCls} resize-y min-h-20`} value={editData.about} onChange={(e) => update("about", e.target.value)} placeholder="Write a short bio..." rows={3} />
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="text-sm text-charcoal mb-1.5 block">Skills</label>
              <div className="flex flex-wrap gap-2 p-2 border border-border rounded-sm bg-cream min-h-[44px] items-center focus-within:border-blue-500/50 focus-within:ring-3 focus-within:ring-blue-500/15 transition-[box-shadow,border-color]">
                {editData.skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-1 px-2.5 py-1 bg-charcoal/[0.04] rounded-full text-[13px]">
                    {skill}
                    <button className="bg-none border-none text-muted text-base leading-none p-0 hover:text-charcoal cursor-pointer" onClick={() => removeSkill(skill)}>×</button>
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
            <div className="mb-4">
              <label className="text-sm text-charcoal mb-2 block">Experience</label>
              {editData.experience.map((exp, i) => (
                <div key={i} className="bg-cream border border-border rounded-sm p-4 mb-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-muted">Experience {i + 1}</span>
                    <button className="bg-error-bg text-error px-3 py-1.5 text-sm rounded-sm hover:bg-error hover:text-white transition-colors cursor-pointer border-none" onClick={() => removeExperience(i)}>Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-charcoal">Company</label>
                      <input className={inputCls} value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-charcoal">Role</label>
                      <input className={inputCls} value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-sm text-charcoal">Period</label>
                    <input className={inputCls} value={exp.period} onChange={(e) => updateExperience(i, "period", e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-charcoal">Description</label>
                    <textarea className={`${inputCls} resize-y min-h-20`} value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} rows={2} />
                  </div>
                </div>
              ))}
              <button className="w-full border border-border-interactive text-charcoal text-sm p-2.5 rounded-sm hover:opacity-80 transition-opacity cursor-pointer bg-transparent" onClick={addExperience}>+ Add Experience</button>
            </div>

            {/* Education */}
            <div className="mb-4">
              <label className="text-sm text-charcoal mb-2 block">Education</label>
              {editData.education.map((edu, i) => (
                <div key={i} className="bg-cream border border-border rounded-sm p-4 mb-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-muted">Education {i + 1}</span>
                    <button className="bg-error-bg text-error px-3 py-1.5 text-sm rounded-sm hover:bg-error hover:text-white transition-colors cursor-pointer border-none" onClick={() => removeEducation(i)}>Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-charcoal">School</label>
                      <input className={inputCls} value={edu.school} onChange={(e) => updateEducation(i, "school", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-charcoal">Degree</label>
                      <input className={inputCls} value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-charcoal">Period</label>
                    <input className={inputCls} value={edu.period} onChange={(e) => updateEducation(i, "period", e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="w-full border border-border-interactive text-charcoal text-sm p-2.5 rounded-sm hover:opacity-80 transition-opacity cursor-pointer bg-transparent" onClick={addEducation}>+ Add Education</button>
            </div>

            {/* Projects */}
            <div className="mb-4">
              <label className="text-sm text-charcoal mb-2 block">Projects</label>
              {editData.projects.map((proj, i) => (
                <div key={i} className="bg-cream border border-border rounded-sm p-4 mb-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-muted">Project {i + 1}</span>
                    <button className="bg-error-bg text-error px-3 py-1.5 text-sm rounded-sm hover:bg-error hover:text-white transition-colors cursor-pointer border-none" onClick={() => removeProject(i)}>Remove</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-charcoal">Name</label>
                      <input className={inputCls} value={proj.name} onChange={(e) => updateProject(i, "name", e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm text-charcoal">URL</label>
                      <input className={inputCls} value={proj.url || ""} onChange={(e) => updateProject(i, "url", e.target.value)} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-sm text-charcoal">Description</label>
                    <textarea className={`${inputCls} resize-y min-h-20`} value={proj.description} onChange={(e) => updateProject(i, "description", e.target.value)} rows={2} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-charcoal">Tech Stack</label>
                    <div className="flex flex-wrap gap-2 p-2 border border-border rounded-sm bg-cream min-h-[44px] items-center">
                      {proj.tech.map((t) => (
                        <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-charcoal/[0.04] rounded-full text-[13px]">
                          {t}
                          <button className="bg-none border-none text-muted text-base leading-none p-0 hover:text-charcoal cursor-pointer" onClick={() => removeProjectTech(i, t)}>×</button>
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
              <button className="w-full border border-border-interactive text-charcoal text-sm p-2.5 rounded-sm hover:opacity-80 transition-opacity cursor-pointer bg-transparent" onClick={addProject}>+ Add Project</button>
            </div>

            {/* Socials */}
            <div className="mb-4">
              <label className="text-sm text-charcoal mb-2 block">Social Links</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(["github", "linkedin", "twitter", "website"] as const).map((key) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-sm text-charcoal capitalize">{key}</label>
                    <input className={inputCls} value={editData.socials[key] || ""} onChange={(e) => updateSocial(key, e.target.value)} placeholder={`https://${key}.com/username`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-3 mt-6">
              <button
                className="bg-charcoal text-cream-light px-5 py-2.5 rounded-sm text-base shadow-btn hover:opacity-85 active:opacity-80 active:scale-[0.98] transition-all disabled:bg-border disabled:text-muted disabled:shadow-none disabled:opacity-100 disabled:cursor-not-allowed"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
              {profile && (
                <button
                  className="border border-border-interactive text-charcoal px-5 py-2.5 rounded-sm text-base hover:opacity-80 active:scale-[0.98] transition-all"
                  onClick={() => {
                    setEditing(false);
                    setParsed(false);
                    setEditData(profile);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

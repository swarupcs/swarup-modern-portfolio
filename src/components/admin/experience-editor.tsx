/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePortfolio } from "@/lib/portfolio-context"
import { Plus, Trash2, Save, X } from "lucide-react"
import { toast } from "sonner"

export default function ExperienceEditor() {
  const { portfolioData, updatePortfolioData } = usePortfolio()
  const [experience, setExperience] = useState(portfolioData.experience)
  const [newSkill, setNewSkill] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    const newExp = {
      id: Date.now().toString(),
      role: "New Role",
      company: "Company Name",
      duration: "Jan 2024 - Present",
      description: "Description of your role and responsibilities",
      skills: [],
    }
    setExperience([newExp, ...experience])
    setEditingId(newExp.id)
  }

  const handleDelete = (id: string) => {
    setExperience(experience.filter((exp) => exp.id !== id))
  }

  const handleUpdate = (id: string, field: string, value: any) => {
    setExperience(experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const handleAddSkill = (expId: string) => {
    if (newSkill.trim()) {
      setExperience(
        experience.map((exp) => (exp.id === expId ? { ...exp, skills: [...exp.skills, newSkill.trim()] } : exp)),
      )
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (expId: string, skill: string) => {
    setExperience(
      experience.map((exp) => (exp.id === expId ? { ...exp, skills: exp.skills.filter((s) => s !== skill) } : exp)),
    )
  }

  const handleSave = () => {
    updatePortfolioData({ experience })
    setEditingId(null)
    toast.success('Success!', {
      description: 'Experience updated successfully.',
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Experience</h2>
          <p className="text-muted-foreground">Manage your work experience</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{exp.role}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleDelete(exp.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Role/Position</Label>
                  <Input value={exp.role} onChange={(e) => handleUpdate(exp.id, "role", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input value={exp.company} onChange={(e) => handleUpdate(exp.id, "company", e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={exp.duration} onChange={(e) => handleUpdate(exp.id, "duration", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Skills Used</Label>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add skill"
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill(exp.id)}
                  />
                  <Button type="button" onClick={() => handleAddSkill(exp.id)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveSkill(exp.id, skill)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave}>
        <Save className="mr-2 h-4 w-4" />
        Save Changes
      </Button>
    </div>
  )
}

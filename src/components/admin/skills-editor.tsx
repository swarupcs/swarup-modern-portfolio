"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/lib/portfolio-context"
import { Plus, Trash2, Save } from "lucide-react"

import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"

export default function SkillsEditor() {
  const { portfolioData, updatePortfolioData } = usePortfolio()
  const [skills, setSkills] = useState(portfolioData.skills)


  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: "New Category",
      skills: [],
    }
    setSkills([...skills, newCategory])
  }

  const handleAddSkill = (categoryId: string) => {
    const updatedSkills = skills.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            skills: [...cat.skills, { name: "New Skill", level: 50, icon: "🔧" }],
          }
        : cat,
    )
    setSkills(updatedSkills)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateSkill = (categoryId: string, skillIndex: number, field: string, value: any) => {
    const updatedSkills = skills.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            skills: cat.skills.map((skill, idx) => (idx === skillIndex ? { ...skill, [field]: value } : skill)),
          }
        : cat,
    )
    setSkills(updatedSkills)
  }

  const handleDeleteSkill = (categoryId: string, skillIndex: number) => {
    const updatedSkills = skills.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            skills: cat.skills.filter((_, idx) => idx !== skillIndex),
          }
        : cat,
    )
    setSkills(updatedSkills)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setSkills(skills.filter((cat) => cat.id !== categoryId))
  }

  const handleSave = () => {
    updatePortfolioData({ skills })
    toast.success('Success!', {
      description: 'Skills updated successfully.',
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">Manage your skills and proficiency levels</p>
        </div>
        <Button onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="space-y-6">
        {skills.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Input
                  value={category.name}
                  onChange={(e) =>
                    setSkills(skills.map((cat) => (cat.id === category.id ? { ...cat, name: e.target.value } : cat)))
                  }
                  className="max-w-xs"
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleAddSkill(category.id)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.skills.map((skill, idx) => (
                <Card key={idx} className="p-4">
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Skill Name</Label>
                        <Input
                          value={skill.name}
                          onChange={(e) => handleUpdateSkill(category.id, idx, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Icon (Emoji)</Label>
                        <Input
                          value={skill.icon}
                          onChange={(e) => handleUpdateSkill(category.id, idx, "icon", e.target.value)}
                          maxLength={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Level: {skill.level}%</Label>
                        <Slider
                          value={[skill.level]}
                          onValueChange={(value) => handleUpdateSkill(category.id, idx, "level", value[0])}
                          max={100}
                          step={5}
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteSkill(category.id, idx)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
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

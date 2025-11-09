"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/lib/portfolio-context"
import { Plus, Trash2, Save } from "lucide-react"
import { toast } from "sonner"


export default function EducationEditor() {
  const { portfolioData, updatePortfolioData } = usePortfolio()
  const [education, setEducation] = useState(portfolioData.education)


  const handleAdd = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: "Degree Name",
      institution: "Institution Name",
      duration: "2020 - 2024",
      description: "Additional details about your education",
    }
    setEducation([newEdu, ...education])
  }

  const handleDelete = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  const handleUpdate = (id: string, field: string, value: string) => {
    setEducation(education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const handleSave = () => {
    updatePortfolioData({ education })
    toast.success('Success!', {
      description: 'Education updated successfully.',
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-muted-foreground">Manage your educational background</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{edu.degree}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => handleDelete(edu.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree/Certificate</Label>
                  <Input value={edu.degree} onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => handleUpdate(edu.id, "institution", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={edu.duration} onChange={(e) => handleUpdate(edu.id, "duration", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={edu.description}
                  onChange={(e) => handleUpdate(edu.id, "description", e.target.value)}
                  rows={3}
                />
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

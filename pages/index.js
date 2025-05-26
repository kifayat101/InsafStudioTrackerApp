// ✅ Full tracker app with localStorage persistence
import { useState, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";

const initialMembers = [
  {
    id: 1,
    name: "Member 1",
    role: "Product Research & Listing Optimization Specialist",
    tasks: Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      task: [
        "Find 5 new trending products on Etsy and write SEO titles",
        "Rewrite 5 product descriptions using keywords",
        "Add 5 new tags for old listings",
        "Upload 3 new digital product drafts with title, description, and tags",
        "Review competition pricing and update ours"
      ][i % 5],
      result: "",
      file: null,
      done: false
    }))
  },
  {
    id: 2,
    name: "Member 2",
    role: "Graphic Designer & Visual Content Creator",
    tasks: Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      task: [
        "Design 5 new product thumbnails in Canva",
        "Create 5 mockup images using templates",
        "Update Etsy listings with new visuals",
        "Create 3 promotional story designs for Instagram/Facebook",
        "Organize visuals in folders for upload tracking"
      ][i % 5],
      result: "",
      file: null,
      done: false
    }))
  },
  {
    id: 3,
    name: "Member 3",
    role: "Marketing & Social Media Manager",
    tasks: Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      task: [
        "Post 1 reel daily on TikTok, IG, and YouTube",
        "Pin 5 products to Pinterest with keyword-rich descriptions",
        "Schedule 1 carousel and 1 story per day",
        "Respond to all Etsy, TikTok, and Instagram comments",
        "Track insights and record in sheet"
      ][i % 5],
      result: "",
      file: null,
      done: false
    }))
  }
];

export default function Home() {
  const [team, setTeam] = useState([]);
  const [activeMember, setActiveMember] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("insafTeam");
    if (saved) {
      setTeam(JSON.parse(saved));
    } else {
      setTeam(initialMembers);
    }
  }, []);

  useEffect(() => {
    if (team.length > 0) {
      localStorage.setItem("insafTeam", JSON.stringify(team));
    }
  }, [team]);

  const toggleTask = (memberId, taskIndex) => {
    const updated = team.map(member => {
      if (member.id === memberId) {
        const updatedTasks = [...member.tasks];
        updatedTasks[taskIndex].done = !updatedTasks[taskIndex].done;
        return { ...member, tasks: updatedTasks };
      }
      return member;
    });
    setTeam(updated);
  };

  const updateResult = (memberId, taskIndex, value) => {
    const updated = team.map(member => {
      if (member.id === memberId) {
        const updatedTasks = [...member.tasks];
        updatedTasks[taskIndex].result = value;
        return { ...member, tasks: updatedTasks };
      }
      return member;
    });
    setTeam(updated);
  };

  const uploadFile = (memberId, taskIndex, file) => {
    const updated = team.map(member => {
      if (member.id === memberId) {
        const updatedTasks = [...member.tasks];
        updatedTasks[taskIndex].file = file.name;
        return { ...member, tasks: updatedTasks };
      }
      return member;
    });
    setTeam(updated);
  };

  const overallProgress = (member) => {
    const total = member.tasks?.length || 0;
    const completed = member.tasks?.filter(t => t.done).length || 0;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const totalTasks = team.reduce((sum, m) => sum + (m.tasks?.length || 0), 0);
  const totalCompleted = team.reduce((sum, m) => sum + (m.tasks?.filter(t => t.done).length || 0), 0);
  const overallProjectProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">InsafStudio Member Task Tracker</h1>

      <div className="max-w-5xl mx-auto">
        <Card className="p-4 mb-6 bg-white shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Overall Project Progress</h2>
          <Progress value={overallProjectProgress} className="h-4" />
          <p className={`mt-2 font-semibold ${overallProjectProgress < 100 ? 'text-red-600' : 'text-green-600'}`}>
            {overallProjectProgress}% Project Completed
          </p>
        </Card>

        {activeMember === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.map(member => (
              <Card key={member.id} onClick={() => setActiveMember(member)} className="cursor-pointer hover:shadow-xl transition">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-gray-600">{member.role}</p>
                  <Progress value={overallProgress(member)} className="mt-4" />
                  <p className={`mt-2 font-bold ${overallProgress(member) < 100 ? 'text-red-600' : 'text-green-600'}`}>
                    {overallProgress(member)}% Complete
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Button className="mb-4" onClick={() => setActiveMember(null)}>← Back to Members</Button>
            <h2 className="text-2xl font-bold mb-2">{activeMember.name} - {activeMember.role}</h2>
            {activeMember.tasks.map((task, index) => (
              <Card key={index} className="bg-white shadow-sm rounded-xl">
                <CardContent className="flex flex-col md:flex-row md:justify-between md:items-center p-4 gap-4">
                  <div className="flex-1">
                    <p className="font-semibold">{task.day}</p>
                    <p>{task.task}</p>
                    <Input
                      type="text"
                      placeholder="Enter result..."
                      value={task.result}
                      onChange={(e) => updateResult(activeMember.id, index, e.target.value)}
                      className="mt-2"
                    />
                    <Input
                      type="file"
                      onChange={(e) => uploadFile(activeMember.id, index, e.target.files[0])}
                      className="mt-2"
                    />
                    {task.file && (
                      <p className="text-sm text-gray-500 mt-1">Uploaded: {task.file}</p>
                    )}
                  </div>
                  <Button
                    variant={task.done ? "secondary" : "default"}
                    onClick={() => toggleTask(activeMember.id, index)}
                  >
                    {task.done ? "Done" : "Mark Done"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

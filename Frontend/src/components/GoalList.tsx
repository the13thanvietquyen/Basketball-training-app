import { useEffect, useState } from "react";
import api from "../api";

interface Goal {
  id: number;
  name: string;
  description: string;
}

interface GoalListProps {
  onSelectGoal: (id: number) => void;
}

function GoalList({ onSelectGoal }: GoalListProps) {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    api
      .get("/goals")
      .then((response) => {
        setGoals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  }, []);

  return (
    <div>
      <h2>Training Goals</h2>

      {goals.map((goal) => (
        <button
          key={goal.id}
          onClick={() => onSelectGoal(goal.id)}
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {goal.name}
        </button>
      ))}
    </div>
  );
}

export default GoalList;
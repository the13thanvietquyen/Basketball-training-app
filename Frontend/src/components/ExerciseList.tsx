import { useEffect, useState } from "react";
import api from "../api";

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  video_url: string;
}

interface ExerciseListProps {
  goalId: number | null;
}

function ExerciseList({ goalId }: ExerciseListProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (goalId !== null) {
      api
        .get(`/goals/${goalId}/exercises`)
        .then((response) => {
          setExercises(response.data);
        })
        .catch((error) => {
          console.error("Error fetching exercises:", error);
        });
    }
  }, [goalId]);

  return (
    <div>
      <h2>Exercises</h2>

      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{exercise.title}</h3>

          <p>{exercise.description}</p>

          <p>
            <strong>Difficulty:</strong> {exercise.difficulty}
          </p>

          <a
            href={exercise.video_url}
            target="_blank"
            rel="noreferrer"
          >
            Watch Video
          </a>
        </div>
      ))}
    </div>
  );
}

export default ExerciseList;
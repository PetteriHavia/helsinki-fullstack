interface Statistic {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  average: number;
  target: number;
  rating: number;
  ratingText: string;
}

export const calculateExercises = (
  exercises: number[],
  target: number
): Statistic => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((item) => item > 0).length;
  const totalTime = exercises.reduce((acc, curr) => (acc += curr));
  const average = totalTime / periodLength;
  const success = exercises.every((item) => item >= target);
  const rating = totalTime > 15 ? 3 : totalTime > 10 ? 2 : 1;
  const ratingText =
    rating === 3
      ? "Great work!"
      : rating === 2
      ? "Good job keep it up!"
      : "Try to up your training hours";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingText,
    target,
    average,
  };
};

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

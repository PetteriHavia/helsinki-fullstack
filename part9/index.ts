import express, { Request, Response } from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculator, Operation } from "./multiply";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformed parameters" });
  }
  res.status(200).json({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/calculate", (req: Request, res: Response) => {
  const { value1, value2, op } = req.body;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "..." });
  }

  const result = calculator(Number(value1), Number(value2), op as Operation);
  return res.send({ result });
});

app.post("/exercise", (req: Request, res: Response) => {
  const { dailyExercises, target } = req.body;

  if (
    dailyExercises.length < 7 ||
    !dailyExercises ||
    !Array.isArray(dailyExercises) ||
    typeof target !== "number"
  ) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const hasNonNumbers = dailyExercises.some(
    (item: any) => typeof item !== "number"
  );

  if (hasNonNumbers || isNaN(Number(target))) {
    return res.status(400).json({ error: "malformed parameters" });
  }

  const results = calculateExercises(dailyExercises, target);

  return res.status(200).json(results);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is rinnung on port ${PORT}`);
});

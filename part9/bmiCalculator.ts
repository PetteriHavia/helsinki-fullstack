interface bmiValues {
  heigth: number;
  weight: number;
}

export const calculateBmi = (heigth: number, weight: number): string => {
  const bmi = weight / ((heigth / 100) * 2);
  if (bmi > 18.5 && bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else {
    return "Overweight";
  }
};

const checkInput = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heigth: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { heigth, weight } = checkInput(process.argv);
  console.log(calculateBmi(heigth, weight));
} catch (error) {
  console.log(error);
}

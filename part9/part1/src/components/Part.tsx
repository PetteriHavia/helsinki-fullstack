import { CoursePart } from "../types";

const Part = ({ item }: { item: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch (item.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>{item.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>project exercises {item.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>{item.description}</p>
          <p>submit to {item.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>
            {item.name} {item.exerciseCount}
          </strong>
          <p>{item.description}</p>
          <p>required skills: {item.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(item);
  }
};

export default Part;

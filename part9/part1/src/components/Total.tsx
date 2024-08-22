interface Total {
  total: number;
}

const Total = ({ total }: Total) => {
  return <div>Number of exercises {total}</div>;
};

export default Total;

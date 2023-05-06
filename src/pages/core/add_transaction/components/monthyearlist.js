export const MonthYear = (props) => {
  const monthYears = props.monthYears;

  return (
    <>
      <option value={""}>Select Month-year</option>
      {monthYears.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </>
  );
};

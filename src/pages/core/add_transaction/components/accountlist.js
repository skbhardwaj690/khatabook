export const Account = (props) => {
  const accountTypes = props.accountTypes;

  return (
    <>
      {accountTypes.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </>
  );
};

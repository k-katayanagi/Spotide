
import InputBox from "@components/InputBox";

const ListNameInput = ({
  listname,
  onChange,
  error,
  setError,
  width,
  height,
}: {
  listname: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  height?: string;
}) => {
  const validateUserName = () => {
    if (listname.length < 100) {
      setError("100文字以上入力してください");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <InputBox
        type="text"
        placeholder="リスト名を入力してください"
        className="bg-white border-2 border-black p-2 rounded"
        width={width}
        height={height}
        value={listname}
        onChange={(e) => onChange(e.target.value)}
        onBlur={validateUserName}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ListNameInput;

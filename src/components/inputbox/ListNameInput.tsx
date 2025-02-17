"use client";
import InputBox from "@components/InputBox";

const ListNameInput = ({
  listName,
  onChange,
  error,
  setError,
  width,
  height,
  className,
}: {
  listName: string;
  onChange: (value: string) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  height?: string;
  className?: string;
}) => {
  // 文字数が10文字を超えた場合にエラーメッセージをセット
  const validateListName = (value: string) => {
    if (value.length > 10) {
      setError("100文字以内で入力してください");
    } else {
      setError(""); // 100文字以下ならエラーメッセージを消す
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 文字数が100文字以下の場合のみ更新を許可
    if (value.length <= 100) {
      onChange(value);
    }

    validateListName(value); // バリデーションの実行
  };

  return (
    <div className="m-auto">
      <label className="block">リスト名</label>
      <InputBox
        type="text"
        placeholder="リスト名を入力してください"
        className={`border border-black rounded-md ${className}`}
        width={width}
        height={height}
        value={listName} // listnameが100文字を超えても表示されるように
        onChange={handleChange}
        onBlur={() => validateListName(listName)} // フォーカスを外したときにバリデーション
        disabled={listName.length > 100}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* エラーメッセージ表示 */}
    </div>
  );
};

export default ListNameInput;

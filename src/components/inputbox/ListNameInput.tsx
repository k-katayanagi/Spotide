'use client'
import InputBox from "@components/InputBox";

const ListNameInput = ({
  placeholder,
  listname,
  onChange,
  error,
  setError,
  className,
  width,
  height,
}: {
  placeholder:string
  listname: string;
  onChange: (value: string) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  className?:string
  width?: string;
  height?: string;
}) => {

  // 文字数が10文字を超えた場合にエラーメッセージをセット
  const validateListName = (value: string) => {
    if (value.length > 100) {
      setError("100文字以内で入力してください");
    } else {
      setError(""); // 100文字以下ならエラーメッセージを消す
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 文字数が10文字以下の場合のみ更新を許可
    if (value.length <= 100) {
      onChange(value);
    }

    validateListName(value); // バリデーションの実行
  };

  return (
    <div className="w-full flex flex-col items-start">
    <label className="block w-[100px]">リスト名</label>
    <InputBox
      type="text"
      placeholder={placeholder}
      className={`border border-black rounded-md w-full ${className}`}
      value={listname}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
  );
};

export default ListNameInput;
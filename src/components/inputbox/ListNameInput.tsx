'use client';
import InputBox from '@components/InputBox';
import Image from 'next/image';

const ListNameInput = ({
  listName,
  onChange,
  error,
  setError,
  className,
}: {
  listName: string;
  onChange: (value: string) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) => {
  // 文字数が10文字を超えた場合にエラーメッセージをセット
  const validateListName = (value: string) => {
    if (value.length > 100) {
      setError('100文字以内で入力してください');
    } else {
      setError(''); // 100文字以下ならエラーメッセージを消す
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
    <div className="relative">
      <label className="block">リスト名</label>
      <InputBox
        type="text"
        placeholder="リスト名を入力してください"
        className={`rounded-md pr-10 ${className}`} // 右側にアイコン用のpaddingを追加
        value={listName} // listnameが100文字を超えても表示されるように
        onChange={handleChange}
        onBlur={() => validateListName(listName)} // フォーカスを外したときにバリデーション
        disabled={listName.length > 100}
      />
      <div className="absolute pr-4 right-2 top-1/2 transform -translate-y-1/5 pointer-events-none">
        <Image src="/images/pen.svg" alt="アイコン" width={20} height={20} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {/* エラーメッセージ表示 */}
    </div>
  );
};

export default ListNameInput;

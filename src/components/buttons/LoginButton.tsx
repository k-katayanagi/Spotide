import Button from '@components/Button';

type Props = {
  onClick:()=>void
}

const LoginButton = ({ onClick }:Props) => {
  return (
    <Button
      text="ログイン"
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600"
    />
  );
};

export default LoginButton;
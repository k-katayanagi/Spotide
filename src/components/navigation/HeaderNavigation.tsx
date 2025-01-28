// components/Navigation/HeaderNavigation.tsx
const HeaderNavigation = () => {
    return (
      <nav className="desktop-nav flex justify-center items-center w-full">
      <ul className="flex space-x-4">
        <li className="text-white hover:text-gray-300 text-lg">TOP</li>
        <li className="text-white hover:text-gray-300 text-lg">リスト作成</li>
        <li className="text-white hover:text-gray-300 text-lg">個人リスト</li>
        <li className="text-white hover:text-gray-300 text-lg">共有リスト</li>
        <li className="text-white hover:text-gray-300 text-lg">マイページ</li>
      </ul>
    </nav>
    );
  };
  
  export default HeaderNavigation;
  
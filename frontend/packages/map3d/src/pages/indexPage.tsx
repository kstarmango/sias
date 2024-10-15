import {useNavigate} from "react-router-dom";

/**
 * 메인 인덱스 페이지
 */
const IndexPage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <button onClick={() => navigate('2d')}>2D</button>
      <button onClick={() => navigate('3d')}>3D</button>
    </main>
  );
};

export default IndexPage;
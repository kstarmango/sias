/**
 * 지도 우측 도구 아이콘 박스
 */
const ToolBox = () => {
  return (
    <>
      <div className="toolbox">  
        <button type="button" className="map-type selected">
          <div className="toolbox-description-content">
            <div className="title">배경지도</div>
          </div>
        </button>
        <button type="button" className="layer">
          <div className="toolbox-description-content">
            <div className="title">레이어</div>
          </div>
        </button>
        <button type="button" className="legend">                    
          <div className="toolbox-description-content">
            <div className="title">범례</div>
          </div>
        </button>                
        <button type="button" className="reset mar-top-50">                    
          <div className="toolbox-description-content">
            <div className="title">초기화</div>
          </div>
        </button>
        <button type="button" className="distance">                    
          <div className="toolbox-description-content">
            <div className="title">거리측정</div> 
          </div>
        </button>
        <button type="button" className="area">                    
          <div className="toolbox-description-content">
            <div className="title">면적측정</div>
          </div>
        </button>
        <button type="button" className="information">                    
          <div className="toolbox-description-content">
            <div className="title">정보보기</div>
          </div>
        </button>
        <button type="button" className="print">                    
          <div className="toolbox-description-content">
            <div className="title">출력</div> 
          </div>
        </button>
      </div>   
      <div className="toolbox zoom">  
        <button type="button" className="zoom-in">
          <div className="toolbox-description-content">
            <div className="title">확대</div>
          </div>
        </button>
        <button type="button" className="zoom-out">
          <div className="toolbox-description-content">
            <div className="title">축소</div>
          </div>
        </button>
      </div> 
    </>
  );
};

export default ToolBox;
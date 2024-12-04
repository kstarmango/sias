import "ol/ol.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AnalysisResultModalOpenState } from "@src/stores/AnalysisCondition";


/**
 * 분석 결과 팝업창
*/
export const AnalysisResultModal = ({ title, data }: { title: string, data: any }) => {
  const setAnalysisResultModalOpen = useSetRecoilState(AnalysisResultModalOpenState);

  return (
    <div className="popup popup-parcel">                
      <button 
        type="button"  
        onClick={() => setAnalysisResultModalOpen({modalOpen: false, title: '', data: {}})} 
        className="close popup-close"
      ></button>
      <h2><span className="txt">{title}</span></h2>

      {/* 
      <div className="content-wrapper mar-top-20">
          <div className="popup-4col-tabmenu">
              <button type="button" className="selected">기본정보</button>
              <button type="button">토지대장</button>
              <button type="button">건축물대장</button>
              <button type="button">용도지역지구</button>
          </div>
          <div className="mar-top-15">
              <div className="parcel-info">
                  <label>토지소재</label>
                  <input type="text" className="width-300" />
              </div>
              <div className="parcel-info">
                  <label>도로명 주소</label>
                  <input type="text" className="width-300" />
              </div>  
              <h3 className="mar-top-15">기본정보</h3>   
              <div className="parcel-detail-info-wrapper">
                  <table className="basic-4col">
                      <caption>기본정보</caption>
                      <tr>
                          <td>지목</td>
                          <td><input type="text" /></td>
                          <td>면적</td>
                          <td><input type="text" /></td>
                      </tr>
                      <tr>
                          <td>개별공시지가</td>
                          <td><input type="text" /></td>
                          <td>개별주택가격</td>
                          <td><input type="text" /></td>
                      </tr>
                      <tr>
                          <td>소유구분</td>
                          <td><input type="text" /></td>
                          <td>소유자명</td>
                          <td><input type="text" /></td>
                      </tr>
                      <tr>
                          <td>소유자주소</td>
                          <td colSpan="3"><input type="text" /></td>
                      </tr>
                      <tr>
                          <td>건물명</td>
                          <td colSpan="3"><input type="text" /></td>
                      </tr>
                      <tr>
                          <td>주 용도</td>
                          <td colSpan="3"><input type="text" /></td>
                      </tr>
                      <tr>
                          <td>대지면적</td>
                          <td><input type="text" /></td>
                          <td>연면적</td>
                          <td><input type="text" /></td>
                      </tr>                                
                      <tr>
                          <td>건축물수</td>
                          <td><input type="text" /></td>
                          <td>건축면적</td>
                          <td><input type="text" /></td>
                      </tr>
                      <tr>
                          <td>건폐율</td>
                          <td><input type="text" /></td>
                          <td>용적률</td>
                          <td><input type="text" /></td>
                      </tr>
                  </table>                            
                  <div className="popup-2col-tabmenu mar-top-20">
                      <button type="button" className="selected">개별공시지가</button>
                      <button type="button">개별주택가격</button>
                  </div>
                  <table className="basic-3col mar-top-7">
                      <caption>공시지가</caption>
                      <tr>
                          <th>기준년월일</th>
                          <th>개별공시지가</th>
                          <th>표준지여부</th>
                      </tr>
                      <tr>
                          <td>2024.12.23</td>
                          <td>234,000,000</td>
                          <td>표준지</td>
                      </tr>
                      <tr>
                          <td>2024.12.23</td>
                          <td>234,000,000</td>
                          <td>표준지</td>
                      </tr>
                  </table>
              </div>                   
          </div>
      </div> 
      */}
    </div> 
  )
}

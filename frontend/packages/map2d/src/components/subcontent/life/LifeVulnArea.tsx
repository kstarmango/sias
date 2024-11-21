import CustomSelect from "@src/components/ui/CustomSelect";
import { AnalysisCondition } from "@src/types/analysis-condition";
import "ol/ol.css";
import { useEffect, useState } from "react";

export interface LifeVulnAreaProps {
  analysisConditions: AnalysisCondition;
}

/**
 * 최단거리 시설 분석 컴포넌트
 * 
 * @param analysisConditions 분석조건
 */

export const LifeVulnArea = ({ analysisConditions }: LifeVulnAreaProps) => {

  // 분석조건 상태
  const [sgg, setSgg] = useState<string>(analysisConditions.sgg);
  const [emd, setEmd] = useState<string>(analysisConditions.emd);
  const [areaType, setAreaType] = useState<string>(analysisConditions.areaType);
  const [analysisFac, setAnalysisFac] = useState<string>(analysisConditions.analysisFac);
  const [analysisPop, setAnalysisPop] = useState<string>(analysisConditions.analysisPop);
  const [analysisPopDeatil, setAnalysisPopDetail] = useState<string>(analysisConditions.analysisPopDetail);

  const [analysisPopDetailList, setAnalysisPopDetailList] = useState<string[]>([]);
  const [popInclude, setPopInclude] = useState<boolean>(false);
  const [gwangjuInclude, setGwangjuInclude] = useState<boolean>(false);

  const handleAreaTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setAreaType(e.target.value); 
  const handlePopIncludeChange = () => setPopInclude(!popInclude);
  const handleGwangjuIncludeChange = () => setGwangjuInclude(!gwangjuInclude);

  // 임시 데이터 목록
  const TEMP_SGG_LIST = ['전체', '목포시', '여수시', '순천시', '완도군', '진도군'];
  const TEMP_EMD_LIST = ['전체', '금화동', '영산동', '중앙동', '중동', '중앙동'];
  const ALALYSIS_FAC_LIST = ['응급의료시설', '소아산부인과', '어린이집 보육시설', '생활방범', '소방서'];
  const ALAYSIS_POP_LIST = ['총인구', '유소년', '생산가능', '고령', '유아', '학생', '연령'];

  const analysisPopDetailArr: Record<string, string[]> = {
    '총인구': ['총 인구 수(전체)', '총 인구 수(남자)', '총 인구 수 (여자)'],
    '유소년': ['유소년 인구 수(전체)', '유소년 인구 수(남자)', '유소년 인구 수(여자)'],
    '생산가능': ['생산가능 인구 수(전체)', '생산가능 인구 수(남자)', '생산가능 인구 수(여자)'],
    '고령': ['고령 인구 수(전체)', '고령 인구 수(남자)', '고령 인구 수(여자)'],
    '유아': ['유아 인구 수(전체)', '유아 인구 수(남자)', '유아 인구 수(여자)'],
    '학생': ['초등학생 인구 수(전체)', '초등학생 인구 수(남자)', '초등학생 인구 수(여자)', '중학생 인구 수(전체)', '중학생 인구 수(남자)', '중학생 인구 수(여자)', '고등학생 인구 수(전체)', '고등학생 인구 수(남자)', '고등학생 인구 수(여자)'],
    '연령': ['20대 인구 수(전체)', '20대 인구 수(남자)', '20대 인구 수(여자)', '30대 인구 수(전체)', '30대 인구 수(남자)', '30대 인구 수(여자)', '40대 인구 수(전체)', '40대 인구 수(남자)', '40대 인구 수(여자)', '50대 인구 수(전체)', '50대 인구 수(남자)', '50대 인구 수(여자)','60대 인구 수(전체)', '60대 인구 수(남자)', '60대 인구 수(여자)','70대 인구 수(전체)', '70대 인구 수(남자)', '70대 인구 수(여자)','80대 인구 수(전체)', '80대 인구 수(남자)', '80대 인구 수(여자)','90대 인구 수(전체)', '90대 인구 수(남자)', '90대 인구 수(여자)', '100세이상 인구 수(전체)', '100세이상 인구 수(남자)', '100세이상 인구 수(여자)']
  };

  useEffect(() => {
    if(analysisPopDetailArr[analysisPop]) {
      setAnalysisPopDetailList(analysisPopDetailArr[analysisPop]);
      setAnalysisPopDetail('세부 분류');
    }
  }, [analysisPop]);

  return (
    <div>
      <div className="information">
        <div className="title info-icon">서비스 취약지역</div>
        <div className="explanation">분석시설(학교, 어린이집, 문화시설, 소방서, 병원)으로 부터 접근성이 취약한 지역을 조회하고 특정지점으로 부터 대상지까지 네트워크 분석을 수행하는 서비스 입니다.</div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">영역 설정</div>
        <div className="analysis-content">
          <label className="custom-radio">
            <input type="radio" value="admin" name="option" checked={areaType === 'admin'} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 행정구역
          </label>
          <label className="custom-radio">
            <input type="radio" value="user" name="option" checked={areaType === 'user'} onChange={handleAreaTypeChange}/>
            <span className="radio-mark"></span> 사용자영역
          </label>                                                   
        </div>
        {areaType === 'admin' && (  
          <div id="admin-area-select" className="clear-both search-condition mar-top-10">
            <div className="condition-list mar-left-13">                            
              <label>시군구</label>
              <CustomSelect options={TEMP_SGG_LIST} selectedOptionState={[sgg, setSgg]} onSelect={(e) => setSgg(e)} />
            </div>    
            <div className="condition-list mar-left-13">                            
              <label>읍면동</label>
              <CustomSelect options={TEMP_EMD_LIST} selectedOptionState={[emd, setEmd]} onSelect={(e) => setEmd(e)} />
            </div>                                  
          </div> 
        )}
        {areaType === 'user' && (
          <div id="user-area-select" className="clear-both condition-area mar-top-10">
            <div className="list-wrapper">      
              <button type="button" className="circle"></button>  
              <button type="button" className="square"></button> 
              <button type="button" className="pentagon"></button>  
            </div> 
            <div className="button-area">
              <button type="button" className="reset">초기화</button>
            </div>                        
          </div>
        )}
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">분석조건 설정</div>
        <div className="analysis-content search-condition">
          <div className="condition-list">
            <label>분석시설</label>
            <CustomSelect options={ALALYSIS_FAC_LIST} selectedOptionState={[analysisFac, setAnalysisFac]} onSelect={(e) => setAnalysisFac(e)} />
          </div>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">인구정보 설정</div>
        <div className="analysis-content search-condition">
          <label>
            <input type="checkbox" onChange={handlePopIncludeChange} style={{marginRight: '10px'}}/>
            <span>인구 포함</span>
          </label>
        </div>
        <div className="clear-both search-condition mar-top-10">
          <div className="condition-list mar-left-13">
            <label>분류</label>
            <CustomSelect options={ALAYSIS_POP_LIST} selectedOptionState={[analysisPop, setAnalysisPop]} onSelect={(e) => setAnalysisPop(e)} />
          </div>
          <div className="condition-list mar-left-13">
            <label>세부분류</label>
            <CustomSelect options={analysisPopDetailList} selectedOptionState={[analysisPopDeatil, setAnalysisPopDetail]} onSelect={(e) => setAnalysisPopDetail(e)} />
          </div>
        </div>
      </div>
      <div className="analysis-condition-wrapper mar-top-30">
        <div className="analysis-title">부가정보 설정</div>
        <div className="analysis-content search-condition" >
          <label style={{whiteSpace: 'nowrap'}}>
            <input type="checkbox" onChange={handleGwangjuIncludeChange} style={{marginRight: '10px'}}/>
            <span>광주광역시 포함</span>
          </label>
        </div>
      </div>
      <div className="button-large-wrapper">
        <button type="button" className="large-button apply">
          <span className="txt">분석</span>
        </button>
      </div>
    </div>
  );
}

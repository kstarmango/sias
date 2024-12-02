package jn.sias.dto.landuse;

import lombok.Data;

@Data
public class LanduseAnalysisRequestDto {

    // 분석타입
    // owner type
    // 0 일본인, 창씨명등, 1 개인, 2 국유지, 3 외국인, 외국공공기관, 4 시, 도유지, 5 군유지
    // 6 법인, 7 종중, 8 종교단체, 9 기타단체
    // , jimk type
    // 01 전, 02 답, 03 과수원, 04 목장, 05 임야
    // 06 광천지, 07 염전, 08 대지, 09 공장용지, 10 학교용지
    // 11 주차장, 12 주유소용지, 13 창고용지, 14 도로, 15 철도용지
    // 16 제방, 17 하천, 18 구거, 19 유지, 20 양어장
    // 21 수도용지, 22 공원용지, 23 체육용지, 24 유원지, 25 종교용지
    // 26 사적지, 27 묘지, 28 잡종지
    protected String analysisType;

    // umdCode , userDraw
    protected String regionType;

    // umdCode number, polygon wkt
    protected String data;
}

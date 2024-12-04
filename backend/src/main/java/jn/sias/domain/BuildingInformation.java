package jn.sias.domain;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BuildingInformation {

    private String pnu;
    private String buildingName;
    private String mainPurpsName;

    private String buildingLandArea;
    private String mgmBldrgst;          // 건축물 대장 번호
    private String registerType;        // 대장종류
    private String buildingArea;        // 연면적
    private String buildingFloorArea;   // 건축면적
    private String dryRatio;            // 건폐율
    private String floorAreaRatio;      // 용적율

    private String baseYear;
    private String baseMonth;
    private int     jiga;
    private String stdYN;
}

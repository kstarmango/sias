package jn.sias.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ParcelBaseInformation {

    private String pnu;

    private String jimkCode;
    private String jimkName;
    private double area;
    private String ownCode;
    private String ownName;

    private String ownrAddress;
    private String mainPurpsName;

    private double dryRatio;        // 건폐율
    private double buildingArea;    // 연면적
    private double buildingLandArea; // 건면적
    private double floorAreaRatio;  // 용적율

    private String baseYear;
    private String baseMonth;
    private int     jiga;
    private String stdYN;
}

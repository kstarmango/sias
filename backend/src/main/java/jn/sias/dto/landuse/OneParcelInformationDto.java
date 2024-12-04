package jn.sias.dto.landuse;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OneParcelInformationDto {

    private ParcelInformationDto parcelInformationDto;  // 기본정보
    private LandRegisterDto landRegisterDto;            // 토지대장
    private BuildingRegisterDto buildingRegisterDto;    // 건축물대장
    private LanduseDto landuseDto;                      // 용도지역지구
    private String      geomText;                       // 필지 geometry
}

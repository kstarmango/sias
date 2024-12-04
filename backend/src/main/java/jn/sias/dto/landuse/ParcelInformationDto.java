package jn.sias.dto.landuse;

import jn.sias.domain.BuildingInformation;
import jn.sias.domain.ParcelBaseInformation;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@SuperBuilder
@Getter @Setter
public class ParcelInformationDto extends ParcelInformationBase {

//    private String admAddress;
//    private String roadAddress;
//
//    private String jimk;
//    private String area;
//    private int     jiga;
//    private String ownrGbn;
//
//    @Builder.Default
//    private String ownrName = "***";
//    private String ownrAddress;


    private String mainPurpsName;
    private String dryRatio;        // 건폐율
    private String buildingArea;    // 연면적
    private String buildingLandArea; // 건면적
    private String floorAreaRatio;  // 용적율

    private List<JigaInformation> landPriceList;
    private List<JigaInformation> buildingPriceList;


    public static ParcelInformationDto buildFrom(String admAddress, String roadAddress,
                                                 List<ParcelBaseInformation> baseInfos,
                                                 List<BuildingInformation> buildingInfos) {

        List<JigaInformation> lpriceList = mappingList(baseInfos, info-> JigaInformation.builder()
                .baseYM(info.getBaseYear()+info.getBaseMonth())
                .jiga(info.getJiga())
                .stdYN(info.getStdYN())
                .build());

        List<JigaInformation> bpriceList = null;
        if(!buildingInfos.isEmpty()) {

            bpriceList = mappingList(buildingInfos, info-> JigaInformation.builder()
                    .buildingRegistryNum(info.getMgmBldrgst())
                    .baseYM(info.getBaseYear()+info.getBaseMonth())
                    .jiga(info.getJiga())
                    .stdYN(info.getStdYN())
                    .build());
        }

        ParcelBaseInformation baseInfo = baseInfos.get(baseInfos.size()-1);

        ParcelInformationDto dto = ParcelInformationDto.builder()
                .admAddress(admAddress)
                .roadAddress(roadAddress)
                .jimk(baseInfo.getJimkCode() + "-" + baseInfo.getJimkName())
                .area(String.format("%.2f m²", baseInfo.getArea()) )
                .jiga(baseInfo.getJiga())
                .ownrGbn(String.format("%s-%s", baseInfo.getOwnCode(), baseInfo.getOwnName()))
                .ownrAddress(baseInfo.getOwnrAddress())

                .mainPurpsName(baseInfo.getMainPurpsName())
                .dryRatio(String.format("%.2f %%", baseInfo.getDryRatio()))
                .buildingArea(String.format("%.2f m²", baseInfo.getBuildingArea()) )
                .buildingLandArea(String.format("%.2f m²", baseInfo.getBuildingLandArea()))
                .floorAreaRatio(String.format("%.2f %%", baseInfo.getFloorAreaRatio()))
                .landPriceList(lpriceList)
                .buildingPriceList(bpriceList)
                .build();

        if(bpriceList != null && !bpriceList.isEmpty()) {

            JigaInformation jigaInfo = bpriceList.get(bpriceList.size()-1);
            dto.setBuildingJiga(jigaInfo.getJiga());
        }

        return dto;
    }

//    public static <T> List<JigaInformation> makePriceList(List<T> baseInfos,
//                                                          Function<T, JigaInformation> mapper) {
//
//        return baseInfos.stream()
//                .map(mapper)
//                .collect(Collectors.toList());
//    }
}

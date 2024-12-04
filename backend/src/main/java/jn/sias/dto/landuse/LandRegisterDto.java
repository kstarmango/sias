package jn.sias.dto.landuse;

import jn.sias.domain.BuildingInformation;
import jn.sias.domain.OwnerShipChangeInformation;
import jn.sias.domain.OwnerShipShareChangeInformation;
import jn.sias.domain.ParcelBaseInformation;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
@Data
public class LandRegisterDto extends ParcelInformationBase {

    protected String landChangeName;
    protected String landChangeYMD;

    protected List<OwnerInformation> ownerChangeList;
    protected List<OwnerInformation> ownerShareChangeList;

    public static LandRegisterDto buildFrom(String admAddress, String roadAddress,
                                            List<ParcelBaseInformation> baseInfos,
                                            List<BuildingInformation> buildingInfos,
                                            List<OwnerShipChangeInformation> ownerInfos,
                                            List<OwnerShipShareChangeInformation> ownerShareInfos) {

        ParcelBaseInformation baseInfo = baseInfos.get(baseInfos.size()-1);

        List<OwnerInformation> ownerChangeList = mappingList(ownerInfos,
                                                    info-> OwnerInformation.builder()
                                                        .changeName(info.getChangeCode()+ "-" + info.getChangeName())
                                                        .changeYMD(info.getChangeYMD())
                                                        .ownerAddress(info.getOwnrAddress())
                                                        .build());

        List<OwnerInformation> ownerShareChangeList = mappingList(ownerShareInfos,
                                                    info-> OwnerInformation.builder()
                                                            .changeName(info.getChangeCode()+ "-" + info.getChangeName())
                                                            .changeYMD(info.getChangeYMD())
                                                            .ownerAddress(info.getOwnrAddress())
                                                            .ownerRatio(info.getOwnspCosm())
                                                            .build());

        LandRegisterDto dto = LandRegisterDto.builder()
                .admAddress(admAddress)
                .roadAddress(roadAddress)
                .jimk(baseInfo.getJimkCode() + "-" + baseInfo.getJimkName())
                .area(String.format("%.2f m²", baseInfo.getArea()) )
                .jiga(baseInfo.getJiga())
                .ownrGbn(String.format("%s-%s", baseInfo.getOwnCode(), baseInfo.getOwnName()))
                .ownrAddress(baseInfo.getOwnrAddress())
                .ownerChangeList(ownerChangeList)
                .ownerShareChangeList(ownerShareChangeList)
                .build();


        if(buildingInfos != null && !buildingInfos.isEmpty()) {

            BuildingInformation jigaInfo = buildingInfos.get(buildingInfos.size()-1);
            dto.setBuildingJiga(jigaInfo.getJiga());
        }

        return dto;
    }

//    private static <T> List<OwnerInformation> makeOwnerList(List<T> list,
//                                                            Function<T, OwnerInformation> mapper) {
//
//        return list.stream()
//                .map(mapper)
//                .collect(Collectors.toList());
//    }
}

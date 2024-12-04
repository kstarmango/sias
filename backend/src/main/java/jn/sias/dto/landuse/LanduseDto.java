package jn.sias.dto.landuse;

import jn.sias.domain.*;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@SuperBuilder
@Data
public class LanduseDto extends ParcelInformationBase {

    protected List<LanduseInformation> landuseInformationList;

    public static LanduseDto buildFrom(String admAddress, String roadAddress,
                                       List<ParcelBaseInformation> baseInfos,
                                       List<LanduseInformation> landuseInfos) {

        ParcelBaseInformation baseInfo = baseInfos.get(baseInfos.size()-1);


        return LanduseDto.builder()
                .admAddress(admAddress)
                .roadAddress(roadAddress)
                .jimk(baseInfo.getJimkCode() + "-" + baseInfo.getJimkName())
                .area(String.format("%.2f m²", baseInfo.getArea()) )
                .jiga(baseInfo.getJiga())
                .ownrGbn(String.format("%s-%s", baseInfo.getOwnCode(), baseInfo.getOwnName()))
                .ownrAddress(baseInfo.getOwnrAddress())
                .landuseInformationList(landuseInfos)
                .build();
    }
}

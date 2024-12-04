package jn.sias.dto.landuse;

import jn.sias.domain.BuildingInformation;
import jn.sias.domain.OwnerShipChangeInformation;
import jn.sias.domain.OwnerShipShareChangeInformation;
import jn.sias.domain.ParcelBaseInformation;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@SuperBuilder
public class BuildingRegisterDto extends ParcelInformationBase {

    protected List<BuildingInformation> buildingList;

    public static BuildingRegisterDto buildFrom(String admAddress, String roadAddress,
                                                List<BuildingInformation> buildingInfos) {

        return BuildingRegisterDto.builder()
                .admAddress(admAddress)
                .roadAddress(roadAddress)
                .buildingList(buildingInfos)
                .build();
    }

}

package jn.sias.dto.landuse;

import lombok.Builder;

@Builder
public class OwnerInformation {

    private String changeYMD;
    private String changeName;

    @Builder.Default
    private String ownerName = "***";
    private String ownerAddress;
    private String ownerRatio;
}

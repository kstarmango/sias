package jn.sias.dto.parcel;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Builder
public class OwnershipChangeInformation {

    private String changeDate;  // 변동일자
    private String whyOwnspChnage;  // 변동원인

    @Builder.Default
    private String ownerName = "***";
    private String ownerAddress;
}

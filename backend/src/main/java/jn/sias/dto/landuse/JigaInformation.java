package jn.sias.dto.landuse;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class JigaInformation {

    private String buildingRegistryNum;
    private String baseYM;
    private int     jiga;
    private String stdYN;
}

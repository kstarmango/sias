package jn.sias.dto.vworld;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class GeoCodeAddressItem {

    private String zipcode;
    private String type;
    private String text;
}

package jn.sias.config.layer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Layer {

    private String name;

    @JsonProperty("geo_layer")
    private String geoLayer;
    private String type;
    private String color;
}

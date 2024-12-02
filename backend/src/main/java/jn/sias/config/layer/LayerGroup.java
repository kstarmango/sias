package jn.sias.config.layer;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class LayerGroup {

    private String name;
    private List<Layer> layers;
}

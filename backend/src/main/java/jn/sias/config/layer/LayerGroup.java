package jn.sias.config.layer;

import lombok.Data;

import java.util.List;

@Data
public class LayerGroup {

    private String name;
    private List<LayerInfo> layers;
}

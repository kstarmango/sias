package jn.sias.config;

import jn.sias.config.layer.LayerGroup;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@ConfigurationProperties(prefix="layer-config")
@Data
public class LayerGroupsConfig {

    private List<LayerGroup> layerGroups;

//    public List<LayerGroup> getLayerGroups() {
//        return  this.layerGroups;
//    }

}

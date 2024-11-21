package jn.sias.config.layer;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "layer-groups")
@Data
public class LayerGroupsConfig {

    private List<LayerGroup> layerGroups;
}

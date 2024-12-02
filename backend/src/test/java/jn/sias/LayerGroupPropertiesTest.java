package jn.sias;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jn.sias.config.LayerGroupsConfig;
import jn.sias.config.layer.LayerGroup;
import jn.sias.service.APISearchService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;
import java.util.List;

@SpringBootTest
@Slf4j
public class LayerGroupPropertiesTest {


//    @Autowired
//    private APISearchService apiSearchService;

    @Autowired
    private ObjectMapper    objectMapper;

    @Autowired
    private LayerGroupsConfig layerGroupsConfig;

//    @Test
//    public void testLoadLayerConfig() throws Exception {
//
//
//        String jsonfile = apiSearchService.getJsonFile();
//        File file = new File(jsonfile);
//
//        JsonNode rootNode = objectMapper.readTree(file);
//        JsonNode addressNode = rootNode.findPath("layer-groups");
//
////        List<LayerGroup> layers = objectMapper.readValue(addressNode.toString(),
////                objectMapper.getTypeFactory().constructCollectionType(List.class, LayerGroup.class));
//        List<LayerGroup> items = convertJsonToList(rootNode, "layer-groups", LayerGroup.class);
//
////        List<Layer> layers = layerGroupsConfig.getLayers();
//
////        Layer layers = layerGroupsConfig.getLayer();
//        log.info("jsonFile : {}", items.size());
//
//
//    }

    @Test
    public void testLayerConfig() {

        log.info("size : {}", layerGroupsConfig.getLayerGroups().size());

    }

    protected <T> List<T> convertJsonToList(JsonNode rootNode, String key, Class<T> clazz) throws Exception {

        JsonNode addressNode = rootNode.findPath(key);
        return objectMapper.readValue(addressNode.toString(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, clazz));
    }

}

package jn.sias;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jn.sias.dto.vworld.AddressItem;
import jn.sias.dto.vworld.Item;
import jn.sias.dto.vworld.Page;
import jn.sias.dto.vworld.Record;
import jn.sias.dto.vworld.VWorldAPISearchResultDto;
import jn.sias.service.APISearchService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;

@Slf4j
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class WebClientTest {

    @Autowired
    private APISearchService apiSearchService;
//
//    protected <T> T convertJsonToObject(String json, String key, Class<T> clazz) throws Exception {
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode rootNode = objectMapper.readTree(json);
//        JsonNode addressNode = rootNode.findPath(key);
//
//        return objectMapper.treeToValue(addressNode, clazz);
//    }
//
//
//    protected static<T> List<T> convertJsonToList(String json, String pathKey, Class<T> clazz) throws Exception {
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode rootNode = objectMapper.readTree(json);
//        JsonNode addressNode = rootNode.findPath(pathKey);
//
//        return objectMapper.readValue(addressNode.toString(),
//                objectMapper.getTypeFactory().constructCollectionType(List.class, clazz));
//    }
//
//    @Test
//    void testSearchEMGString() throws Exception {
//
//        String emgString = apiSearchService.getEMDString("목포시");
//
//        log.info("result : {}", emgString);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        VWorldAPISearchResultDto dto = objectMapper.readValue(emgString, VWorldAPISearchResultDto.class);
//        log.info("total page : {}, counts : {}", dto.getTotalPages(), dto.getTotalCounts());
//
//        JsonNode rootNode = objectMapper.readTree(emgString);
//        JsonNode itemsNode = rootNode.findPath("items");
//        JsonNode pageNode = rootNode.findPath("page");
//        JsonNode recordNode = rootNode.findPath("record");
//
//        if(pageNode != null) {
//            log.info("total page : {}", pageNode.get("total"));
//            Page page = convertJsonToObject(rootNode.toString(), "page", Page.class);
//            log.info("emdList size : {}", page.total);
//        }
//
//        if(recordNode != null) {
//            log.info("total record count : {}", recordNode.get("total"));
//            Record emdList = convertJsonToObject(rootNode.toString(), "record", Record.class);
//            log.info("emdList size : {}", emdList.total);
//        }
//
//        JsonNode addressNode = rootNode.path("response").path("result").path("items");
//
//        List<Item> emdList = objectMapper.readValue(addressNode.toString(), new TypeReference<List<Item>>() {});
//        log.info("result : {}", Arrays.toString(emdList.stream().toArray()));
//
//    }

//    @Test
//    void testSearchRoadString() throws Exception {
//
//        String roadString = apiSearchService.getRoadString("나진1");
//
//        log.info("result : {}", roadString);
//
//        List<AddressItem> emdList = convertJsonToList(roadString, "items", AddressItem.class);
////        ObjectMapper objectMapper = new ObjectMapper();
////        JsonNode rootNode = objectMapper.readTree(roadString);
////        JsonNode addressNode = rootNode.path("response").path("result").path("items");
////
////        List<AddressItem> emdList = objectMapper.readValue(addressNode.toString(), new TypeReference<List<AddressItem>>() {});
//        log.info("result : {}", Arrays.toString(emdList.stream().toArray()));
//
//    }

    @Test
    void testSearchSGGList() throws Exception {

        List<String> sggList = apiSearchService.getSGGList();

        log.info("result size : {}", sggList.size());
        log.info("result : {}", Arrays.toString(sggList.stream().toArray()));
    }

    @Test
    void testSearchEMDList() throws Exception {

        List<String> emdList = apiSearchService.getEMDList("여수시");

        log.info("result size : {}", emdList.size());
        log.info("result : {}", Arrays.toString(emdList.stream().toArray()));
    }

    @Test
    void testSearchEMDParcel() throws Exception {

        List<AddressItem> emdParcelList = apiSearchService.searchEMDParcel("목포시", "금화동", "1");

        log.info("result size : {}", emdParcelList.size());
        log.info("result : {}", Arrays.toString(emdParcelList.stream().toArray()));
    }

    @Test
    void testSearchRoadAddress() throws Exception {

        List<AddressItem> roadAddressList = apiSearchService.searchRoadAddress("여수시", "나진1길", "36");

        log.info("result size : {}", roadAddressList.size());
        log.info("result : {}", Arrays.toString(roadAddressList.stream().toArray()));
    }

    @Test
    void testSearchPlace() throws Exception {

        List<AddressItem> placeList = apiSearchService.searchPlace("커뮤니티");

        log.info("result size : {}", placeList.size());
        log.info("result : {}", Arrays.toString(placeList.stream().toArray()));
    }


    @Test
    void testSearchRoadList() throws Exception {

        List<String> roadList = apiSearchService.getRoadList("여수시");

        log.info("result size : {}", roadList.size());
        log.info("result : {}", Arrays.toString(roadList.stream().toArray()));
    }
}

package jn.sias;

import jn.sias.dto.vworld.*;
import jn.sias.service.APISearchService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;

@Slf4j
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class VworldAPITest {

    @Autowired
    private APISearchService apiSearchService;

    @Value("${search-api.vworld.key}")
    String key;


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

        List<List<String>> emdList = apiSearchService.getEMDList("여수시");

        log.info("result size : {}", emdList.size());
        log.info("name result : {}", Arrays.toString(emdList.get(0).stream().toArray()));
        log.info("code result : {}", Arrays.toString(emdList.get(1).stream().toArray()));
    }

    @Test
    void testSearchEMDParcel() throws Exception {

        List<AddressItem> emdParcelList = apiSearchService.searchEMDParcel("목포시", "금화동", "1");

        log.info("result size : {}", emdParcelList.size());
        log.info("result : {}", Arrays.toString(emdParcelList.stream().toArray()));
    }
//    483E0418-2F46-3223-80A1-F66D16A24685

    @Test
    void testSearchRoadAddressByPoint() throws Exception {

//        String geomText = "POINT(143017.99839841994,242968.49454689625)";
        String geom4326 = "126.37745973473574,34.78093299229861";
        String geomText = "143017.99839841994,242968.49454689625";
        String pnuCode = "4611010100101710029";
        String url = String.format(
                "service=address&request=getAddress&key=%s&format=json&type=PARCEL&parcel=%s",
                key, pnuCode
        );
        
        findPnuAndParcelInformation(geomText);

        String[] arryAddress = apiSearchService.searchAddressByGeoCode(geomText);
        log.info("geo code : {}, result : {}", geomText, Arrays.toString(arryAddress));

//        https://api.vworld.kr/req/address?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=126.978275264,37.566642192
//                &format=xml&type=both&zipcode=true&simple=false&key=483E0418-2F46-3223-80A1-F66D16A24685
    }

    private void findPnuAndParcelInformation(String geomText) {

        // select * from vw_lrgtn101_cbnd_jiga v
        //where v.pnu = '4677039023107310002'


    }


    @Test
    void testSearchRoadAddress() throws Exception {

        SearchAPIDto searchDto = SearchAPIDto.builder()
                .sgg("여수시").keyword("나진1길").detail("36")
                                        .build();

        List<AddressItem> roadAddressList = apiSearchService.searchRoadAddress(searchDto);

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

package jn.sias.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jn.sias.dto.vworld.*;

import jn.sias.dto.vworld.Record;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class APISearchService {

//    private final CacheManager  cacheManager;

    @Value("${search-api.vworld.key}")
    String key;

    private final String sido = "전라남도";
    private final String sggCategory = "L2";
    private final String emdCategory = "L4";
    private final String parcelCategory = "PARCEL";

    private final String roadCategory = "road";
    private final String addressType = "address";
    private final String placeType = "place";
    private final String districtType = "district";

    private final String pageNodeKey = "page";
    private final String recordNodeKey = "record";
    private final String itemsNodeKey = "items";

    private final WebClient webClient;

    private final ObjectMapper objectMapper;
    
    /**
     * v world api를 이용하여 시군구 목록을 가져오는 함수
     *
     * @return 시군구 목록
     * @throws Exception
     */
    public List<String> getSGGList() throws Exception {

        return getDistrictList(districtType, sido, sggCategory, Item.class);
    }

    /**
     *
     * @param type
     * @param query
     * @param category
     * @return
     * @throws Exception
     */
    public<T extends Item> List<String> getDistrictList(String type, String query,
                                        String category, Class<T> clazz) throws Exception {

        VWorldAPISearchDistrictDto queryObj = VWorldAPISearchDistrictDto.builder()
                .query(query)
                .category(category)
                .type(type)
                .key(key)
                .build();

        VWorldAPISearchResultDto<T> resultDto = search(queryObj, clazz);
        List<String> districtList = resultDto.getItems().stream()
                .map( item -> item.removePrefix(query))
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        return districtList;
    }

    public<T extends Item> List<T> searchDistrictDetails(String type, String query,
                                                        String category, Class<T> clazz,
                                                         Comparator<T> comparator) throws Exception {

        VWorldAPISearchDistrictDto queryObj = VWorldAPISearchDistrictDto.builder()
                .query(query)
                .category(category)
                .type(type)
                .key(key)
                .build();

        VWorldAPISearchResultDto<T> resultDto = search(queryObj, clazz);
        List<T> districtList = resultDto.getItems().stream()
                .sorted(comparator)
                .collect(Collectors.toList());

        return districtList;
    }

    public List<String> getEMDList(String sgg) throws Exception {

        String queryStr = sido +  " " + sgg;
        return getDistrictList(districtType, queryStr, emdCategory, Item.class);
    }

    public List<AddressItem> searchEMDParcel(String sgg, String emd, String detail) throws Exception {

        String queryStr = String.format("%s %s %s %s", sido, sgg, emd, detail);
        return searchDistrictDetails(addressType, queryStr, parcelCategory,
                AddressItem.class, Comparator.comparing(Item::getId));
    }

    public List<AddressItem> searchRoadAddress(String sgg, String road, String detail) throws Exception {

        String queryStr = String.format("%s %s %s %s", sido, sgg, road, detail);
        return searchDistrictDetails(addressType, queryStr, roadCategory,
                AddressItem.class, Comparator.comparing(AddressItem::getRoad));
    }

    public List<AddressItem> searchPlace(String name) throws Exception {

        return searchDistrictDetails(placeType, name, placeType,
                AddressItem.class, Comparator.comparing(AddressItem::getRoad));
    }

    public List<String> getRoadList(String sgg) throws Exception {

        String queryStr = sgg;
        return getDistrictList(roadCategory, queryStr, roadCategory, RoadItem.class);
    }

    protected <T> List<T> convertJsonToList(JsonNode rootNode, String key, Class<T> clazz) throws Exception {

        JsonNode addressNode = rootNode.findPath(key);
        return objectMapper.readValue(addressNode.toString(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, clazz));
    }

    protected <T> T convertJsonToObject(JsonNode rootNode, String key, Class<T> clazz) throws Exception {

//        ObjectMapper objectMapper = new ObjectMapper();
//        JsonNode rootNode = objectMapper.readTree(json);
        JsonNode addressNode = rootNode.findPath(key);

        return objectMapper.readValue(addressNode.toString(), clazz);
    }

    /**
     * */
    private<T> VWorldAPISearchResultDto<T> search(SearchFormDataConvert formData, Class<T> clazz) throws Exception {

        log.info("search started!!");
        VWorldAPISearchResultDto<T> searchResultDto = _search(formData, Integer.valueOf(1), clazz);
        int totalPages = searchResultDto.getTotalPages();
        for(int p=2;p<=totalPages; p++) {
            log.info("search {} page started!!", p);
            VWorldAPISearchResultDto<T> subSearchResultDto = _search(formData, Integer.valueOf(p), clazz);
            searchResultDto.mergeItems(subSearchResultDto);
        }

        log.info("search ended!!");

        return searchResultDto;
    }

    private<T> VWorldAPISearchResultDto<T> _search(SearchFormDataConvert formData, Integer page, Class<T> clazz) throws Exception {

        MultiValueMap<String, String>  params = formData.toFormData(page);

        Mono<String> resultMono = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/req/search")
                        .queryParams(params)
                        .build())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(e -> new RuntimeException(e.getMessage()));

        String json = resultMono.block();
        return parseSearchResult(json, clazz);
    }

    private <T> VWorldAPISearchResultDto<T> parseSearchResult(String json, Class<T> clazz) throws Exception {

        JsonNode rootNode = objectMapper.readTree(json);

        Page page = convertJsonToObject(rootNode, pageNodeKey, Page.class);
        Record record = convertJsonToObject(rootNode, recordNodeKey, Record.class);
        List<T> items = convertJsonToList(rootNode, itemsNodeKey, clazz);

        return VWorldAPISearchResultDto.<T>builder()
                            .items(items)
                            .totalCounts(Integer.parseInt(record.total))
                            .totalPages(Integer.parseInt(page.total))
                            .build();
    }
}

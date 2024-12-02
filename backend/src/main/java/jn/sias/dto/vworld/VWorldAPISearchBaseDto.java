package jn.sias.dto.vworld;

import lombok.Builder;
import lombok.Value;
import lombok.experimental.SuperBuilder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;



@SuperBuilder
public class VWorldAPISearchBaseDto {

    @Builder.Default
    String service = "search";

    @Builder.Default
    String request = "search";

    @Builder.Default
    String version = "2.0";

    @Builder.Default
    String size = "1000";

    @Builder.Default
    String format = "json";

    @Builder.Default
    String errorformat = "json";

    @Builder.Default
    String type = "district";

    @Builder.Default
    String bbox = "125.0958943496122231,33.9716070112166975,127.8215384749895946,36.2986821617731721";

    @Builder.Default
    String page = "1";

    String query;

    String key;

    @Builder.Default
    String crs = "EPSG:5186";

    protected MultiValueMap<String, String> _toFormData() {

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        formData.add("service", service);
        formData.add("request", request);
        formData.add("version", version);
        formData.add("size", size);
        formData.add("format", format);
        formData.add("errorformat", errorformat);
        formData.add("type", type);
        formData.add("query", query);
        formData.add("bbox", bbox);
        formData.add("key", key);
        formData.add("page", page);
        formData.add("crs", crs);

        return formData;
    }

}

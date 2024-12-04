package jn.sias.dto.vworld;

import lombok.Builder;
import lombok.experimental.SuperBuilder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;


@SuperBuilder
public class VWorldAPIAddressBaseDto {

    @Builder.Default
    String service = "address";

    @Builder.Default
    String request = "getAddress";

    @Builder.Default
    String version = "2.0";

    @Builder.Default
    String format = "json";

    @Builder.Default
    String type = "both";

    String point;

    @Builder.Default
    String simple = "false";

    @Builder.Default
    String zipcode = "true";

    String key;

    @Builder.Default
    String crs = "EPSG:5186";

    public MultiValueMap<String, String> toFormData() {

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        formData.add("service", service);
        formData.add("request", request);
        formData.add("version", version);
        formData.add("format", format);
        formData.add("type", type);
        formData.add("point", point);
        formData.add("simple", simple);
        formData.add("zipcode", zipcode);
        formData.add("crs", crs);
        formData.add("key", key);

        return formData;
    }

}

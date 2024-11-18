package jn.sias.dto.vworld;

import org.springframework.util.MultiValueMap;

public interface SearchFormDataConvert {

    MultiValueMap<String, String> toFormData(Integer page);
}

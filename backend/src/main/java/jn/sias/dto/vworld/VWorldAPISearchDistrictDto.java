package jn.sias.dto.vworld;

import lombok.Builder;
import lombok.experimental.SuperBuilder;
import org.springframework.util.MultiValueMap;


@SuperBuilder
public class VWorldAPISearchDistrictDto extends VWorldAPISearchBaseDto
                                    implements SearchFormDataConvert {

    @Builder.Default
    String category = "L2";

    @Override
    public MultiValueMap<String, String> toFormData(Integer page) {

        if(page != null)
            this.page = page.toString();

        MultiValueMap<String, String> formData = _toFormData();
        formData.add("category", category);


        return formData;
    }
}

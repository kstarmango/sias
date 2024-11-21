package jn.sias.dto.vworld;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Builder
@EqualsAndHashCode
public class CodeItem {

    protected String code;
    protected String name;
}

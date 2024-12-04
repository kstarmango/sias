package jn.sias.dto.vworld;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchAPIDto {

    private String sgg;
    private String keyword;
    private String detail;
}

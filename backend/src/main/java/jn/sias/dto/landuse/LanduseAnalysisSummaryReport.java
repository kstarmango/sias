package jn.sias.dto.landuse;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LanduseAnalysisSummaryReport {

    private String code;
    private String codeName;

    private int totalCount;
    private double totalArea;

    private List<String> geomList;
}

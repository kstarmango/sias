package jn.sias.service;

import jn.sias.dto.landuse.LanduseAnalysisCode;
import jn.sias.dto.landuse.LanduseAnalysisRequestDto;
import jn.sias.domain.LanduseAnalysisResultDto;
import jn.sias.repository.LanduseAnalysisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jn.sias.dto.landuse.LanduseAnalysisSummaryReport;

@Service
@Slf4j
public class LanduseAnalysisService {

    @Autowired
    private LanduseAnalysisRepository landuseAnalysisRepository;

    public Map<String, LanduseAnalysisSummaryReport> analysisLanduse(LanduseAnalysisRequestDto analysisInfo) throws Exception{

        List<LanduseAnalysisResultDto> resultDtoList = null;

        String requestCode = String.format("%s_%s",
                                analysisInfo.getAnalysisType(), analysisInfo.getRegionType());

        LanduseAnalysisCode codeType = LanduseAnalysisCode.fromCode(requestCode);

        switch (codeType) {
            case owner_userdraw:
                resultDtoList = landuseAnalysisRepository.findOwnByUserDraw(analysisInfo.getData());
                break;

            case owner_umdcode:
                resultDtoList = landuseAnalysisRepository.findOwnByAdm(analysisInfo.getData());
                break;

            case jimk_umdcode:
                resultDtoList = landuseAnalysisRepository.findJimkByAdm(analysisInfo.getData());
                break;

            case jimk_userdraw:
                resultDtoList = landuseAnalysisRepository.findJimkByUserDraw(analysisInfo.getData());
                break;
        }

        if(resultDtoList == null) {
            return null;
        }

        return this.summaryResult(resultDtoList);
    }


    private Map<String, LanduseAnalysisSummaryReport>
            summaryResult(List<LanduseAnalysisResultDto> resultDtoList) {

        Map<String, LanduseAnalysisSummaryReport> summarizeResults = resultDtoList.stream()
                .collect(Collectors.groupingBy(
                        LanduseAnalysisResultDto::getCode, // code 별로 그룹화
                        Collectors.mapping(
                                dto -> dto, Collectors.collectingAndThen(
                                        Collectors.toList(),
                                        list -> {
                                            int count = list.size();
                                            LanduseAnalysisResultDto dto = list.get(0);
                                            if (dto == null)    return null;

                                            double areaSum = list.stream()
                                                    .mapToDouble(LanduseAnalysisResultDto::getArea)
                                                    .sum();
                                            List<String> geomList = list.stream()
                                                    .map(LanduseAnalysisResultDto::getGeomText)
                                                    .collect(Collectors.toList());

                                            return LanduseAnalysisSummaryReport.builder()
                                                    .code(dto.getCode())
                                                    .codeName(dto.getCode_nm())
                                                    .geomList(geomList)
                                                    .totalCount(count)
                                                    .totalArea(areaSum)
                                                    .build();
                                        }
                                )
                        )
                ));

        summarizeResults.forEach((jimk, stats) -> {
            log.info("code : {}", jimk);
            log.info("code Name :  " + stats.getCodeName());
            log.info("total Count :  " + stats.getTotalCount());
            log.info("total Area :  " + stats.getTotalArea());
        });

        return summarizeResults;
    }
}

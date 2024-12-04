package jn.sias;

import jn.sias.domain.LanduseAnalysisResultDto;
import jn.sias.dto.landuse.LanduseAnalysisSummaryReport;
import jn.sias.repository.LanduseAnalysisRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootTest
@MapperScan("jn.sias.repository")
@Slf4j
public class LanduseAnalysisTest {

    @Autowired
    private LanduseAnalysisRepository landuseAnalysisRepository;

//    private String userGeom = "POLYGON((14134963.964494813 4171964.4544195617,14134809.613501381 4171702.691471914,14135364.974411208 4171631.5766872326,14135334.709504014 4171950.836655046,14135018.441311132 4171973.532846123,14134963.964494813 4171964.4544195617))";
    private String userGeom = "POLYGON((14077498.508686451 4139013.4122049278,14077510.705022668 4138726.2752908296,14078280.182569034 4138724.058010778,14078292.378844345 4139069.952671159,14077678.127356524 4139079.930400942,14077498.508686451 4139013.4122049278))";

    @Test
    void testFindJimkByAdm() {

        String umdCode = "46110155";

        try {
            List<LanduseAnalysisResultDto> resultDtoList = landuseAnalysisRepository.findJimkByAdm(umdCode);

            summaryResult(resultDtoList);

        } catch (Exception ex) {
            log.error(ex.getMessage());
        }
    }

    @Test
    void testFindJimkByUserDraw() {

        String umdCode = "46110155";

        try {
            List<LanduseAnalysisResultDto> resultDtoList =
                    landuseAnalysisRepository.findJimkByUserDraw(this.userGeom);
            summaryResult(resultDtoList);

        } catch (Exception ex) {
            log.error(ex.getMessage());
        }
    }


    @Test
    void testFindOwnByUserDraw() {

        String umdCode = "46110155";

        try {
            List<LanduseAnalysisResultDto> resultDtoList =
                    landuseAnalysisRepository.findOwnByUserDraw(this.userGeom);
            summaryResult(resultDtoList);

        } catch (Exception ex) {
            log.error(ex.getMessage());
        }
    }

    @Test
    void testFindOwnByAdm() {

        String umdCode = "46110155";

        try {
            List<LanduseAnalysisResultDto> resultDtoList = landuseAnalysisRepository.findOwnByAdm(umdCode);
            summaryResult(resultDtoList);

        } catch (Exception ex) {
            log.error(ex.getMessage());
        }
    }


    private void summaryResult(List<LanduseAnalysisResultDto> resultDtoList) {

        Map<String, LanduseAnalysisSummaryReport> summarizeResults = resultDtoList.stream()
                .collect(Collectors.groupingBy(
                        LanduseAnalysisResultDto::getCode, // jimk별로 그룹화
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
    }
}

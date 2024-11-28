package jn.sias.controller;

import jn.sias.domain.LanduseAnalysisResultDto;
import jn.sias.dto.landuse.LanduseAnalysisRequestDto;
import jn.sias.dto.landuse.LanduseAnalysisSummaryReport;
import jn.sias.service.LanduseAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/test/analysis")
public class LanduseAnalysisController {

    private final LanduseAnalysisService landuseAnalysisService;

    @PostMapping("landuse")
    public ResponseEntity<Map<String, LanduseAnalysisSummaryReport>> analysisLanduse(
                        @RequestBody LanduseAnalysisRequestDto analysisInfo) throws Exception {

        Map<String, LanduseAnalysisSummaryReport> resultReports = landuseAnalysisService.analysisLanduse(analysisInfo);

        return new ResponseEntity<>(resultReports, HttpStatus.OK);
    }
}

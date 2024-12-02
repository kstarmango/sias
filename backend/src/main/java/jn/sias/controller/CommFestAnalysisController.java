package jn.sias.controller;

import jn.sias.domain.CommFestAnalysisResultDto;
import jn.sias.service.CommFestAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/test/commFestAnalysis")
public class CommFestAnalysisController {

    private final CommFestAnalysisService commFestAnalysisService;

    @GetMapping("/festYear")
    public ResponseEntity<List<CommFestAnalysisResultDto>> searchFestYear(HttpServletRequest request) throws Exception {

        List<CommFestAnalysisResultDto> festList = commFestAnalysisService.getFestYearList();
        return new ResponseEntity<>(festList, HttpStatus.OK);
    }

    @GetMapping("/festList")
    public ResponseEntity<List<CommFestAnalysisResultDto>> searchFest(HttpServletRequest request,
              @RequestParam(value="yyyy", required = true) String yyyy) throws Exception {

        List<CommFestAnalysisResultDto> festList = commFestAnalysisService.getFestList(yyyy);
        return new ResponseEntity<>(festList, HttpStatus.OK);
    }

}

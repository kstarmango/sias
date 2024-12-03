package jn.sias.controller;

import jn.sias.domain.FlowAnalysisDto;
import jn.sias.service.FlowAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/test/commFest")
public class FlowAnalysisController {

    private final FlowAnalysisService flowAnalysisService;

    /**
     * 축제 연도 리스트 불러오기
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/getFestYearList")
    public ResponseEntity<List<FlowAnalysisDto>> searchFestYear(HttpServletRequest request) throws Exception {

        List<FlowAnalysisDto> festList = flowAnalysisService.getFestYearList();
        return new ResponseEntity<>(festList, HttpStatus.OK);
    }

    /**
     * 선택 연도에 따른 축제 리스트 불러오기
     * @param request
     * @param yyyy
     * @return
     * @throws Exception
     */
    @GetMapping("/getFestList")
    public ResponseEntity<List<FlowAnalysisDto>> searchFest(HttpServletRequest request,
                                                            @RequestParam(value="yyyy", required = true) String yyyy) throws Exception {

        List<FlowAnalysisDto> festList = flowAnalysisService.getFestList(yyyy);

        return new ResponseEntity<>(festList, HttpStatus.OK);
    }

}

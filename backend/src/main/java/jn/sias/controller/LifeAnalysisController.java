package jn.sias.controller;

import jn.sias.domain.life.LifeCategoryInfoDto;
import jn.sias.domain.life.LifePopInfoDto;
import jn.sias.domain.life.LifePopTypeInfoDto;
import jn.sias.service.LifeAnalysisService;
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
@RequestMapping("/api/test/life")
public class LifeAnalysisController {

    private final LifeAnalysisService lifeAnalysisService;

    /**
     * 생활서비스 카테고리 정보 리스트
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/getLifeCatList")
    public ResponseEntity<List<LifeCategoryInfoDto>> getLifeCatList(HttpServletRequest request) throws Exception {

        List<LifeCategoryInfoDto> catList = lifeAnalysisService.getLifeCatList();
        return new ResponseEntity<>(catList, HttpStatus.OK);
    }

    /**
     * 서비스취약지역 카테고리 정보 리스트
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/getWeakCatList")
    public ResponseEntity<List<LifeCategoryInfoDto>> getWeakCatList(HttpServletRequest request) throws Exception {

        List<LifeCategoryInfoDto> catList = lifeAnalysisService.getWeakCatList();
        return new ResponseEntity<>(catList, HttpStatus.OK);
    }

    /**
     * 서비스취약지역 인구 분류 정보 리스트
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/getPopTypeList")
    public ResponseEntity<List<LifePopTypeInfoDto>> getPopTypeList(HttpServletRequest request) throws Exception {

        List<LifePopTypeInfoDto> popTypeList = lifeAnalysisService.getPopTypeList();
        return new ResponseEntity<>(popTypeList, HttpStatus.OK);
    }

    /**
     * 서비스취약지역 선택 분류별 인구 정보 리스트
     * @param log_type_nm
     * @return
     * @throws Exception
     */
    @GetMapping("/getPopList")
    public ResponseEntity<List<LifePopInfoDto>> getPopList(HttpServletRequest request,
                                                           @RequestParam(value="log_type_nm", required = true) String log_type_nm) throws Exception {

        List<LifePopInfoDto> popList = lifeAnalysisService.getPopList(log_type_nm);
        return new ResponseEntity<>(popList, HttpStatus.OK);
    }

}

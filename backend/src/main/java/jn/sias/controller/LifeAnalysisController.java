package jn.sias.controller;

import jn.sias.domain.LifeCategoryInfoDto;
import jn.sias.domain.district.SggDistrictDto;
import jn.sias.service.LifeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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

}

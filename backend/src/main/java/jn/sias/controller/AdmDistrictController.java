package jn.sias.controller;

import jn.sias.domain.district.EmdDistrictDto;
import jn.sias.domain.district.SggDistrictDto;
import jn.sias.service.AdmDistrictService;
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
@RequestMapping("/api/test/district")
public class AdmDistrictController {

    private final AdmDistrictService admDistrictService;

    /**
     * 전남 시군구 리스트 불러오기
     * @param request
     * @return
     * @throws Exception
     */
    @GetMapping("/getSggList")
    public ResponseEntity<List<SggDistrictDto>> getSggList(HttpServletRequest request) throws Exception {

        List<SggDistrictDto> sggList = admDistrictService.getSggList();
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    /**
     * 선택 시군구 정보 및 읍면동 리스트 불러오기
     * @param request
     * @param sig_cd
     * @return
     * @throws Exception
     */
    @GetMapping("/getSelSgg")
    public ResponseEntity<Map<String, Object>> getSelSgg(HttpServletRequest request,
                                                           @RequestParam(value="sig_cd", required = true) String sig_cd) throws Exception {

        SggDistrictDto sggInfo = admDistrictService.getSggInfo(sig_cd);
        List<EmdDistrictDto> emdList = admDistrictService.getEmdList(sig_cd);

        Map<String, Object> result = new HashMap<>();

        result.put("sggInfo", sggInfo);
        result.put("emdList", emdList);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 선택 읍면동 정보 불러오기
     * @param request
     * @param emd_cd
     * @return
     * @throws Exception
     */
    @GetMapping("/getSelEmd")
    public ResponseEntity<EmdDistrictDto> getSelEmd(HttpServletRequest request,
                                                          @RequestParam(value="emd_cd", required = true) String emd_cd) throws Exception {

        EmdDistrictDto emdInfo = admDistrictService.getEmdInfo(emd_cd);

        return new ResponseEntity<>(emdInfo, HttpStatus.OK);
    }

}

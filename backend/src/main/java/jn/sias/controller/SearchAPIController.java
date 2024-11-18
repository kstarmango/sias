package jn.sias.controller;

import jn.sias.dto.vworld.AddressItem;
import jn.sias.service.APISearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.netty.http.server.HttpServerRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/test/search")
public class SearchAPIController {

    private final APISearchService apiSearchService;

    @GetMapping("/sgg")
    public ResponseEntity<List<String>> searchSGG(HttpServletRequest request) throws Exception {

        List<String> sggList = apiSearchService.getSGGList();
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @GetMapping("/sgg_road")
    public ResponseEntity<List<String>> searchSGG(@RequestParam(required = true)String sgg,
                                                  HttpServletRequest request) throws Exception {

        List<String> sggList = apiSearchService.getRoadList(sgg);
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @GetMapping("/emd_list")
    public ResponseEntity<List<String>> searchEMD(@RequestParam(required = true)String sgg,
                                                  HttpServletRequest request) throws Exception {

        List<String> sggList = apiSearchService.getEMDList(sgg);
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @GetMapping("/road_address")
    public ResponseEntity<List<AddressItem>> searchRoadAddress(@RequestParam(required = true) String sgg,
                                                               @RequestParam(required = true) String road,
                                                               @RequestParam(required = true) String detail,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> sggList = apiSearchService.searchRoadAddress(sgg, road, detail);
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @GetMapping("/place")
    public ResponseEntity<List<AddressItem>> searchRoadAddress(@RequestParam(required = true)String name,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> sggList = apiSearchService.searchPlace(name);
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @GetMapping("/emd_parcel")
    public ResponseEntity<List<AddressItem>> searchEMDParcel(@RequestParam(required = true)String sgg,
                                                             @RequestParam(required = true)String emd,
                                                             @RequestParam(required = true)String detail,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> sggList = apiSearchService.searchEMDParcel(sgg, emd, detail);
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

}

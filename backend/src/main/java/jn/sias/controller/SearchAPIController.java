package jn.sias.controller;

import jn.sias.dto.vworld.AddressItem;
import jn.sias.service.APISearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import reactor.netty.http.server.HttpServerRequest;

import jn.sias.dto.vworld.SearchAPIDto;

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

    @PostMapping("/sgg_road")
    public ResponseEntity<List<String>> searchSGG(@RequestBody SearchAPIDto searchDto,
                                                  HttpServletRequest request) throws Exception {

        List<String> sggList = apiSearchService.getRoadList(searchDto.getSgg());
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @PostMapping("/emd_list")
    public ResponseEntity<List<String>> searchEMD(@RequestBody SearchAPIDto searchDto,
                                                  HttpServletRequest request) throws Exception {

        List<String> sggList = apiSearchService.getEMDList(searchDto.getSgg());
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @PostMapping("/road_address")
    public ResponseEntity<List<AddressItem>> searchRoadAddress(@RequestBody SearchAPIDto searchDto,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> sggList = apiSearchService.searchRoadAddress(searchDto);
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @PostMapping("/place")
    public ResponseEntity<List<AddressItem>> searchPlace(@RequestBody SearchAPIDto searchDto,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> sggList = apiSearchService.searchPlace(searchDto.getKeyword());
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

    @PostMapping("/emd_parcel")
    public ResponseEntity<List<AddressItem>> searchEMDParcel(@RequestBody SearchAPIDto searchDto,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> sggList = apiSearchService.searchEMDParcel(searchDto);
        return new ResponseEntity<>(sggList, HttpStatus.OK);
    }

}

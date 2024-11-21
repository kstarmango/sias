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

    @PostMapping("/key")
    public ResponseEntity<String> getAPIKey(HttpServletRequest request) throws Exception {

        String key = apiSearchService.getAPIKey();
        return new ResponseEntity<>(key, HttpStatus.OK);
    }

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
    public ResponseEntity<List<List<String>>> searchEMD(@RequestBody SearchAPIDto searchDto,
                                                  HttpServletRequest request) throws Exception {

        List<List<String>> emdList = apiSearchService.getEMDList(searchDto.getSgg());
        return new ResponseEntity<>(emdList, HttpStatus.OK);
    }

    @PostMapping("/road_address")
    public ResponseEntity<List<AddressItem>> searchRoadAddress(@RequestBody SearchAPIDto searchDto,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> roadAddressList = apiSearchService.searchRoadAddress(searchDto);
        return new ResponseEntity<>(roadAddressList, HttpStatus.OK);
    }

    @PostMapping("/place")
    public ResponseEntity<List<AddressItem>> searchPlace(@RequestBody SearchAPIDto searchDto,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> placeList = apiSearchService.searchPlace(searchDto.getKeyword());
        return new ResponseEntity<>(placeList, HttpStatus.OK);
    }

    @PostMapping("/emd_parcel")
    public ResponseEntity<List<AddressItem>> searchEMDParcel(@RequestBody SearchAPIDto searchDto,
                                                               HttpServletRequest request) throws Exception {

        List<AddressItem> pacelList = apiSearchService.searchEMDParcel(searchDto);
        return new ResponseEntity<>(pacelList, HttpStatus.OK);
    }

}

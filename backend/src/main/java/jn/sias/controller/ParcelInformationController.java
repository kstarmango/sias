package jn.sias.controller;

import jn.sias.dto.landuse.OneParcelInformationDto;
import jn.sias.service.ParcelInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/test/parcel")
public class ParcelInformationController {

    private final ParcelInformationService parcelInformationService;

    @PostMapping("/info")
    public ResponseEntity<OneParcelInformationDto> getParcelInfo(@RequestParam("pt") String pt,
                                                                 HttpServletRequest request) throws Exception {

        OneParcelInformationDto dto = parcelInformationService.findOneParcelInformation(pt);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}

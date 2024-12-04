package jn.sias.service;

import jn.sias.domain.*;
import jn.sias.dto.landuse.*;
import jn.sias.repository.ParcelInformationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class ParcelInformationService {

    @Autowired
    private ParcelInformationRepository parcelInformationRepository;

    @Autowired
    private APISearchService apiSearchService;


    private String pointToGeomPoint(String pt) {
//        "POINT(143017.99839841994 242968.49454689625)";
        String[] xy = pt.split(",");
        double x = Double.parseDouble(xy[0]);
        double y = Double.parseDouble(xy[1]);
        return String.format("'POINT(%.2f %.2f )'", x, y);
//        return "'POINT(" + pt.replace(",", " ") + ")'";

    }

    public OneParcelInformationDto findOneParcelInformation(String pt) throws Exception {

//        String pt = "143017.99839841994,242968.49454689625";
        String geomText = pointToGeomPoint(pt);

        PNUBase pnuBase = parcelInformationRepository.findParcelPUNByPoint(geomText);
        String pnu = pnuBase.getPnu();
        String[] arryAddress = apiSearchService.searchAddressByGeoCode(pt);

        CompletableFuture<List<ParcelBaseInformation>> futureParcel = fetchParcelInformation(pnu);
        CompletableFuture<List<BuildingInformation>> futureBuilding = fetchBuildingInformation(pnu);
        CompletableFuture<List<OwnerShipChangeInformation>> futureOwnrShip = fetchOwnrChangeInformation(pnu);
        CompletableFuture<List<OwnerShipShareChangeInformation>> futureOwnrShare = fetchOwnrShareChangeInformation(pnu);
        CompletableFuture<List<LanduseInformation>> futureLanduse = fetchLanduseInformation(pnu);

        CompletableFuture.allOf(futureParcel, futureBuilding, futureOwnrShip,
                futureOwnrShare, futureLanduse).join();

        try {

            List<ParcelBaseInformation> parcelBaseInfos = futureParcel.get();
            List<BuildingInformation> bInfos = futureBuilding.get();
            List<OwnerShipChangeInformation> oInfos = futureOwnrShip.get();
            List<OwnerShipShareChangeInformation> shareInfos = futureOwnrShare.get();
            List<LanduseInformation> landuseInfos = futureLanduse.get();

            ParcelInformationDto parcelInformationDto = ParcelInformationDto.buildFrom(arryAddress[0], arryAddress[1],
                    parcelBaseInfos, bInfos);

            LandRegisterDto landRegisterDto = LandRegisterDto.buildFrom(arryAddress[0], arryAddress[1],
                    parcelBaseInfos, bInfos, oInfos, shareInfos);

            BuildingRegisterDto buildingRegisterDto = BuildingRegisterDto.buildFrom(arryAddress[0], arryAddress[1], bInfos);

            LanduseDto landuseDto = LanduseDto.buildFrom(arryAddress[0], arryAddress[1], parcelBaseInfos, landuseInfos);
            landuseInfos.forEach(landInfo -> landInfo.convertYNCode());

            return OneParcelInformationDto.builder()
                            .parcelInformationDto(parcelInformationDto)
                            .buildingRegisterDto(buildingRegisterDto)
                            .landRegisterDto(landRegisterDto)
                            .landuseDto(landuseDto)
                            .geomText(pnuBase.getGeomText())
                            .build();

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Async
    private CompletableFuture<List<LanduseInformation>> fetchLanduseInformation(String pnu) {
        List<LanduseInformation> results = parcelInformationRepository.findLanduseInformation(pnu);
        return CompletableFuture.completedFuture(results);
    }

    @Async
    private CompletableFuture<List<OwnerShipShareChangeInformation>> fetchOwnrShareChangeInformation(String pnu) {
        List<OwnerShipShareChangeInformation> results = parcelInformationRepository.findOwnerShipShareChangeInformation(pnu);
        return CompletableFuture.completedFuture(results);
    }

    @Async
    private CompletableFuture<List<OwnerShipChangeInformation>> fetchOwnrChangeInformation(String pnu) {

        List<OwnerShipChangeInformation> results = parcelInformationRepository.findOwnerShipChangeInformation(pnu);
        return CompletableFuture.completedFuture(results);
    }

    @Async
    private CompletableFuture<List<BuildingInformation>> fetchBuildingInformation(String pnu) {

        List<BuildingInformation> results = parcelInformationRepository.findBuildingInformation(pnu);
        return CompletableFuture.completedFuture(results);
    }

    @Async
    private CompletableFuture<List<ParcelBaseInformation>> fetchParcelInformation(String pnu) {

        List<ParcelBaseInformation> results = parcelInformationRepository.findParcelBaseInformation(pnu);
        return CompletableFuture.completedFuture(results);
    }

}

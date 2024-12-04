package jn.sias;

import jn.sias.domain.*;
import jn.sias.dto.landuse.BuildingRegisterDto;
import jn.sias.dto.landuse.LandRegisterDto;
import jn.sias.dto.landuse.ParcelInformationDto;
import jn.sias.repository.ParcelInformationRepository;
import jn.sias.service.APISearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.annotation.Async;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@SpringBootTest
@Slf4j
@RequiredArgsConstructor
public class ParcelInformationTest {

    @Autowired
    private ParcelInformationRepository parcelInformationRepository;

    @Autowired
    private APISearchService apiSearchService;


    @Test
    void testParcelBaseInformation() throws Exception {

        String pt = "143017.99839841994,242968.49454689625";

        String geomText = pointToGeomPoint(pt);
//        String geomText = "POINT(143017.99839841994 242968.49454689625)";
        PNUBase pnuBase = parcelInformationRepository.findParcelPUNByPoint(geomText);
        String pnu = pnuBase.getPnu();
        String[] arryAddress = apiSearchService.searchAddressByGeoCode(pt);


//        String pnu = "4677039023107310002";
        List<ParcelBaseInformation> pInfos = parcelInformationRepository.findParcelBaseInformation(pnu);
//        ParcelBaseInformation result = results.get(0);
//        log.info("pun : {}", pnu);
//        log.info("jimkCode : {}", result.getJimkCode() + "-" + result.getJimkName());
//        log.info("ownCode : {}", result.getOwnCode() + "-" + result.getOwnName());


        CompletableFuture<List<ParcelBaseInformation>> futureParcel = fetchParcelInformation(pnu);
        CompletableFuture<List<BuildingInformation>> futureBuilding = fetchBuildingInformation(pnu);
        CompletableFuture<List<OwnerShipChangeInformation>> futureOwnrShip = fetchOwnrChangeInformation(pnu);
        CompletableFuture<List<OwnerShipShareChangeInformation>> futureOwnrShare = fetchOwnrShareChangeInformation(pnu);
        CompletableFuture<List<LanduseInformation>> futureLanduse = fetchLanduseInformation(pnu);

        CompletableFuture.allOf(futureParcel, futureBuilding, futureOwnrShip,
                                futureOwnrShare, futureLanduse).join();

        try {
            List<ParcelBaseInformation> lInfos = futureParcel.get();
            List<BuildingInformation> bInfos = futureBuilding.get();
            List<OwnerShipChangeInformation> oInfos = futureOwnrShip.get();
            List<OwnerShipShareChangeInformation> shareInfos = futureOwnrShare.get();
            List<LanduseInformation> data5 = futureLanduse.get();

            ParcelInformationDto pInfo = ParcelInformationDto.buildFrom(arryAddress[0], arryAddress[1],
                                                                            lInfos, bInfos);

            LandRegisterDto pRegInfo = LandRegisterDto.buildFrom(arryAddress[0], arryAddress[1],
                                                    lInfos, bInfos, oInfos, shareInfos);

            BuildingRegisterDto buildingDto = BuildingRegisterDto.buildFrom(arryAddress[0], arryAddress[1], bInfos);

            log.info("ParcelBaseInformation : {}", lInfos.size());
            log.info("BuildingInformation : {}", bInfos.size());
            log.info("OwnerShipChangeInformation : {}", oInfos.size());
            log.info("OwnerShipShareChangeInformation : {}", shareInfos.size());
            log.info("LanduseInformation : {}", data5.size());

            // 결과 처리 로직
//            processResults(data1, data2);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private String pointToGeomPoint(String pt) {
//        "POINT(143017.99839841994 242968.49454689625)";
        return "'POINT(" + pt.replace(",", " ") + ")'";

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

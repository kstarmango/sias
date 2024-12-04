package jn.sias.repository;

import jn.sias.domain.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ParcelInformationRepository {

    PNUBase findParcelPUNByPoint(@Param("geomText")String point);

    List<ParcelBaseInformation> findParcelBaseInformation(@Param("pnu")String pnu);
    List<BuildingInformation> findBuildingInformation(@Param("pnu")String pnu);
    List<OwnerShipChangeInformation> findOwnerShipChangeInformation(@Param("pnu")String pnu);
    List<OwnerShipShareChangeInformation> findOwnerShipShareChangeInformation(@Param("pnu")String pnu);
    List<LanduseInformation> findLanduseInformation(@Param("pnu")String pnu);
}

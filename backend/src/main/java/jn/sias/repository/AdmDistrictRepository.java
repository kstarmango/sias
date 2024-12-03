package jn.sias.repository;

import jn.sias.domain.district.EmdDistrictDto;
import jn.sias.domain.district.SggDistrictDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdmDistrictRepository {

    List<SggDistrictDto> getSggList();

    SggDistrictDto getSggInfo(String sig_cd);

    List<EmdDistrictDto> getEmdList(String sig_cd);

    EmdDistrictDto getEmdInfo(String emd_cd);

}

package jn.sias.repository;

import jn.sias.domain.flow.FlowFestInfoDto;
import jn.sias.domain.flow.FlowSalesClassInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FlowAnalysisRepository {

    List<FlowFestInfoDto> getFestYearList();

    List<FlowFestInfoDto> getFestList(String yyyy);

    List<FlowSalesClassInfoDto> getSalesClassList();

}

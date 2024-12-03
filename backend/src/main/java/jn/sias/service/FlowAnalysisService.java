package jn.sias.service;

import jn.sias.domain.flow.FlowFestInfoDto;
import jn.sias.domain.flow.FlowSalesClassInfoDto;
import jn.sias.repository.FlowAnalysisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FlowAnalysisService {

    @Autowired
    private FlowAnalysisRepository flowAnalysisRepository;

    public List<FlowFestInfoDto> getFestYearList () throws Exception {

        List<FlowFestInfoDto> festList = flowAnalysisRepository.getFestYearList();

        return festList;
    }

    public List<FlowFestInfoDto> getFestList (String yyyy) throws Exception {

        List<FlowFestInfoDto> festList = flowAnalysisRepository.getFestList(yyyy);

        return festList;
    }

    public List<FlowSalesClassInfoDto> getSalesClassList () throws Exception {

        List<FlowSalesClassInfoDto> salesList = flowAnalysisRepository.getSalesClassList();

        return salesList;
    }

}

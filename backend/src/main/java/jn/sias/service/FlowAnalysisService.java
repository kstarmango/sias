package jn.sias.service;

import jn.sias.domain.FlowAnalysisDto;
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

    public List<FlowAnalysisDto> getFestYearList () throws Exception {

        List<FlowAnalysisDto> festList = flowAnalysisRepository.getFestYearList();

        return festList;
    }

    public List<FlowAnalysisDto> getFestList (String yyyy) throws Exception {

        List<FlowAnalysisDto> festList = flowAnalysisRepository.getFestList(yyyy);

        return festList;
    }

}

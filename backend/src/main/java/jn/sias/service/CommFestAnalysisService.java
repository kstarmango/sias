package jn.sias.service;

import jn.sias.domain.CommFestAnalysisResultDto;
import jn.sias.repository.CommFestAnalysisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class CommFestAnalysisService {

    @Autowired
    private CommFestAnalysisRepository commFestAnalysisRepository;

    public List<CommFestAnalysisResultDto> getFestYearList () throws Exception {

        List<CommFestAnalysisResultDto> festList = commFestAnalysisRepository.getFestYearList();

        return festList;
    }

    public List<CommFestAnalysisResultDto> getFestList (String yyyy) throws Exception {

        List<CommFestAnalysisResultDto> festList = commFestAnalysisRepository.getFestList(yyyy);

        return festList;
    }

}

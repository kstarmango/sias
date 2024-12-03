package jn.sias.service;

import jn.sias.domain.district.EmdDistrictDto;
import jn.sias.domain.district.SggDistrictDto;
import jn.sias.repository.AdmDistrictRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AdmDistrictService {

    @Autowired
    private AdmDistrictRepository admDistrictRepository;

    public List<SggDistrictDto> getSggList () throws Exception {

        List<SggDistrictDto> sggList = admDistrictRepository.getSggList();

        return sggList;
    }

    public SggDistrictDto getSggInfo (String sig_cd) throws Exception {

        SggDistrictDto sggInfo = admDistrictRepository.getSggInfo(sig_cd);

        return sggInfo;
    }

    public List<EmdDistrictDto> getEmdList (String sig_cd) throws Exception {

        List<EmdDistrictDto> emdList = admDistrictRepository.getEmdList(sig_cd);

        return emdList;
    }

    public EmdDistrictDto getEmdInfo (String emd_cd) throws Exception {

        EmdDistrictDto emdInfo = admDistrictRepository.getEmdInfo(emd_cd);

        return emdInfo;
    }

}

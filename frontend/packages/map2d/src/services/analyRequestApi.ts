import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const festivalEndPoint = '/api/test/flow';
const lifeEndPoint = '/api/test/life';
const districtEndPoint = '/api/test/district';

const defaultOpt = {
  // enabled: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
}

/** 축제 --------------------------------------------------------------------------*/

/**
 * 축제 데이터 조회
 * @param data 축제 연도
 */
export const getFestivalListData = (data: string) => {

  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: festivalEndPoint + '/getFestList',
      params: {
        yyyy: data
      }
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getFestList', data],
    queryFn: () => callApi(),
    enabled: !!data,
    ...defaultOpt
  });
}

/**
 * 축제 연도 데이터 조회
 */
export const getFestivalYearList = () => {

  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: festivalEndPoint + '/getFestYearList',
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getFestYearList'],
    queryFn: () => callApi(),
    ...defaultOpt
  });
}


/** 생활서비스 ----------------------------------------------------------------------*/

/**
 * 생활서비스 카테고리 데이터 조회
 */
export const getLifeCatList = () => {
  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: lifeEndPoint + '/getLifeCatList',
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getLifeCatList'],
    queryFn: () => callApi(),
    ...defaultOpt
  });
}

/**
 * 서비스취약지역 카테고리 데이터 조회
 */
export const getWeakCatList = () => { 
  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: lifeEndPoint + '/getWeakCatList',
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getWeakCatList'],
    queryFn: () => callApi(),
    ...defaultOpt
  });
} 


/** 시군구 --------------------------------------------------------------------------*/

/**
 * 전남 시군구 데이터 조회
 */
export const getSggList = () => {
  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: districtEndPoint + '/getSggList',
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getSggList'],
    queryFn: () => callApi(),
    ...defaultOpt
  });
}

/**
 * 선택 시군구 및 읍면동 데이터 조회
 * @param sigCd 시군구 코드
 */
export const getSelSgg = (sigCd: string, changeSgg: (data: any) => void) => {
  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: districtEndPoint + '/getSelSgg',
      params: {
        sig_cd: sigCd
      }
    })

    changeSgg(res.data);

    return res.data;
  }

  return useQuery({
    queryKey: ['getSelSgg', sigCd],
    queryFn: () => callApi(),
    enabled: !!sigCd,
    ...defaultOpt
  });
}

/**
 * 선택 읍면동 데이터 조회
 * @param emdCd 읍면동 코드
 */
export const getSelEmd = (emdCd: string, changeEmd: (data: any) => void) => {
  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: districtEndPoint + '/getSelEmd',
      params: {
        emd_cd: emdCd
      }
    })

    changeEmd(res.data);

    return res.data;
  }

  return useQuery({
    queryKey: ['getSelEmd', emdCd],
    queryFn: () => callApi(),
    enabled: !!emdCd,
    ...defaultOpt
  });
}


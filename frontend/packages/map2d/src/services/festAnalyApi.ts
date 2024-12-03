import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const endPoint = '/api/test/commFestAnalysis';

const defaultOpt = {
  // enabled: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
}

export const getFestivalListData = (data) => {

  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: endPoint + '/festList',
      params: {
        yyyy: data
      }
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getFestivalListData', data],
    queryFn: () => callApi(),
    enabled: !!data,
    ...defaultOpt
  });
}

export const getFestivalYearList = () => {

  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: endPoint + '/festYear',
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getFestivalYearList'],
    queryFn: () => callApi(),
    ...defaultOpt
  });
}

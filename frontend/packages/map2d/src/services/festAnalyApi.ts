import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const endPoint = '/api/test/flow';

const defaultOpt = {
  // enabled: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
}

export const getFestivalListData = (data) => {

  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: endPoint + '/getFestList',
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

export const getFestivalYearList = () => {

  const callApi = async () => {
    const res = await axios({
      method: 'GET',
      url: endPoint + '/getFestYearList',
    })

    return res.data;
  }

  return useQuery({
    queryKey: ['getFestYearList'],
    queryFn: () => callApi(),
    ...defaultOpt
  });
}

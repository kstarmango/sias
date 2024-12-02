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
    queryKey: ['getFestivalListData'],
    queryFn: () => callApi(),
    ...defaultOpt
  });
}
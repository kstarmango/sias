// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { axiosInstance } from "./axiosInstance";
// import dotenv from 'dotenv';

// dotenv.config();
// const endPoint = process.env.REACT_APP_GAIA_API_SERVER_URL + 'service api path';

// const defaultOpt = {
//   enabled: false,
//   refetchOnMount: false,
//   refetchOnWindowFocus: false,
// }

// export const UseQueryExmaple = (data, type) => {

//   const callApi = async () => {
//     const res = await axiosInstance({
//       method: 'GET',
//       url: endPoint + 'dataType'
//     })
//     return res;
//   }

//   return useQuery({
//     queryKey: ['queryKey'],
//     queryFn: () => callApi(),
//     ...defaultOpt
//   });
// }

// export const UseMutationExample = (api) => {
// 	const queryClient = useQueryClient();

//   const { mutate } = useMutation({
//     mutationFn: (variables) => api(endPoint).post('', data(variables)),
//     onSuccess: () => queryClient.invalidateQueries('queryKey'),
//     ...defaultOpt
//   })

// 	return { mutate };
// };
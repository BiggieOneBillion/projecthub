import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProjectEmployees = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`project-employee-${id}`],
    queryFn: async () => {
      const res = await axios.get(`/api/project/${id}/employees`);
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
export default useProjectEmployees;

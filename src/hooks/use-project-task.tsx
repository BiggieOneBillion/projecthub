import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export default function useProjectTask(){
    const {} = useQuery({
        queryKey:["project-task"],
        queryFn : async () => {
            const res = await axios.get('')
            return res.data
        }
    })
    return {

    }
}
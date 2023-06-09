import { useQuery } from "@tanstack/react-query";
import { getSingleUserById } from "../utils/user/https";

export const useUser = (_id, token) => {
	const { isLoading, data, error } = useQuery({
		queryKey: ["user", _id],
		queryFn: async () => {
			if (!_id || !token) {
				return null;
			}
			const dataUser = await getSingleUserById(_id, token);
			if (dataUser?.data) {
				return dataUser?.data;
			}
			return null;
		},
	});

	return {
		isLoading,
		user: data,
		error,
	};
};

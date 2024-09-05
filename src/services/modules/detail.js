import dlRequest from '../request'

export const getDetailInfos = (houseId) => {
	return dlRequest.get({
		url: "/detail/infos",
        params: {
            houseId
        }
	})
}


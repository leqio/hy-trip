import dlRequest from '../request'

export const getCityAll = () => {
	return dlRequest.get({
		url: "/city/all"
	})
}


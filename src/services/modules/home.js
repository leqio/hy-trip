// 热门建议网络请求
import dlRequest from '../request'

// 热门建议
export const getHomeHotSuggests = () => {
	return dlRequest.get({
		url: "/home/hotSuggests"
	})
}

// 菜单
export const getHomeCategories = () => {
	return dlRequest.get({
		url: "/home/categories"
	})
}

// 房屋列表
export const getHomeHouseList = (currentPage) => {
	return dlRequest.get({
		url: "/home/houselist",
		params: {
			page: currentPage
		}
	})
}
let steamUrl =
	'https://store.steampowered.com/broadcast/ajaxgetappinfoforcap?appid=gameid&feature=store-partner-events&cc=CN&l=schinese&origin=https:%2F%2Fstore.steampowered.com'
export function get(appid, showLoading) {
	if (showLoading) {
		wx.showLoading({
			title: '加载中',
			mask: true
		})
	}
	return new Promise((resolve, reject) => {
		// let url = steamUrl.replace('gameid', appid)
		let url = 'https://f50cda04-8a49-4c85-85c5-5b7f9f8099bc.bspapp.com/http/games'
		console.log(1)
		wx.request({
			url: url,
			method: 'GET',
			success: function(res) {
				console.log(res)
				if (showLoading) {
					wx.hideLoading()
				}
				resolve(res.data)
			},
			fail: function(ret) {
				console.log(ret)
				if (showLoading) {
					wx.hideToast()
				}
				reject(ret)
			}
		})
	})
}

export function cloud(url, body, showLoading) {
	if (showLoading) {
		wx.showLoading({
			title: '加载中',
			mask: true
		})
	}
	return new Promise((resolve, reject) => {
		uniCloud
			.callFunction({
				name: url,
				data: body
			})
			.then(res => {
				console.log(res.result.data);
				console.log(res)
				if (showLoading) {
					wx.hideLoading()
				}
				resolve(res.result.data)
			});
	})
}

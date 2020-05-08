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
		let url = steamUrl.replace('gameid', appid)
		console.log(1)
		wx.request({
			url: url,
			method: 'GET',
			dataType: 'jsonp',
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
				dara: body
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

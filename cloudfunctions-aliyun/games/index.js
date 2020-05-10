'use strict';
const db = uniCloud.database()
let returnData = {
	code: 200,
	msg: "success"
}
exports.main = async (event, context) => {
	console.log('event : ' + event)
	const collection = db.collection('games')
	if (event.body) {
		let body = JSON.parse(event.body)
		if (body.type == 'create') {
			const res = await collection.add(body.data)
			console.log(res)
			returnData.data = {
				id: body.id
			}
			return returnData
		} else if (body.type == 'edit') {
			let _id = body.data._id
			delete body.data._id
			const res = await collection.doc(_id).update(body.data)
			console.log(res)
			returnData.data = {
				id: body.id
			}
			return returnData
		} else if (body.type == 'delete') {
			for (let id of body.data) {
				await collection.doc(id).remove();
			}
			return returnData
		}
	}
	if (event.type == 'get') {
		const res = await collection.where({
			_id: event.id
		}).get()
		return {
			"code": 200,
			"msg": "success",
			"data": res.data[0]
		}
	}
	const res = await collection.limit(100).get()
	return {
		"code": 200,
		"msg": "success",
		"data": res.data,
		"totalCount": res.data.length
	}
};

const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('meals')
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

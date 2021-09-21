const apiResponse = (_res, _statusCode = 200, _data) => _res.status(_statusCode).json({ ..._data });

module.exports = {
	apiResponse
};
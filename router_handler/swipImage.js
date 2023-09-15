const fs = require('fs')
const { baseUrl } = require('../config')
exports.sendImage = (req, res) => {
  res.send({
    status: 200,
    msg: '获取成功',
    data: [
      {
        imag_id: 1,
        imag_src: baseUrl + '/api/images/1.jpg',
      },
      {
        imag_id: 2,
        imag_src: baseUrl + '/api/images/2.jpg',
      },
    ],
  })
}

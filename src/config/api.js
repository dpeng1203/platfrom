import { myPost,myGet,myDelete } from './axioxLoading'

//  登录
export const login = p => myPost('/login/phone', p);
//  账户明细
export const merInfo = p => myGet('/wallet',{params: p})
//  提现
export const deposit = p => myPost('/cash', p);
//  今日账单数据
export const todayNum = p => myGet('/bill/today',{params: p})
//  账单明细
export const billList = p => myGet('/bill',{params: p})
// 密钥
export const key = p => myGet('/user/secret',{params: p})
// 随机生成私钥
export const randomKey = p => myPost('/user/secret/random', p);
// 设置私钥
export const setKey = p => myPost('/user/secret', p);
//  查询结算信息
// export const settlement = p => myGet('/user/settlement',{params: p})
// 修改结算信息
// export const own = p => myPost('/user/settlement/own', p);

// 用户信息
// export const accountList = p => myGet('/admin/user/list',{params: p})

// 利率设置
// export const accountRate = p => myPost('/user/settlement/charge', p);

//  登出
export const loginOut = () => myDelete('/own')

//  重设密码
export const resetKey = p => myPost('/pwd/forget', p);

//  上传图片
export const imgUp = p => myPost('/files', p);

//  获取图片
export const getImg = p => myGet('/files/' + p)

//  提交审核
export const submitAudit = p => myPost('/user/base', p);

// 商户基本信息
export const merList = p => myGet('/user/base',{params: p})

//商户应用信息
export const merAppRate = p => myGet('/mch/app',{params: p})

// 提现列表
export const auditList = p => myGet('/cash/list',{params: p})
 
//  图标数据
export const chartData = p => myGet('/stats',{params: p})

// 主页数据统计
export const statsTotal = p => myGet('/stats/total',{params: p})

//  统一下单
export const payOrder = p => myPost('/pay/order', p)

// 补单
export const reissue = p => myPost('/bill/reissue', p)
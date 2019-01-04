import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
//商家管理
const merList = resolve => require(['../components/merManagement/merList'], resolve);
const merInfo = resolve => require(['../components/merManagement/merInfo'], resolve);
const merAudit = resolve => require(['../components/merManagement/merAudit'], resolve);
const cashList = resolve => require(['../components/merManagement/cashList'], resolve);
const merApp = resolve => require(['../components/merManagement/merApp'], resolve);

//测试商户--二维码
const codePay = resolve => require(['../components/merManagement/codePay'], resolve);
const cnt = resolve => require(['../components/cntTest'], resolve);
//主页
const homeDetail = resolve => require(['../components/homeDetail/homeDetail'], resolve);

//交易管理
const billDetail = resolve => require(['../components/billManage/billDetail'], resolve);
const oneBillDetail = resolve => require(['../components/billManage/oneBillDetail'], resolve);

// 密钥管理
const keyManage = resolve => require(['../components/keyManage/keyManage'], resolve);
const resetKey = resolve => require(['../components/keyManage/resetKey'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/homeDetail',
      children:[
        //商家管理
        {path: 'merList', name: 'merList', component: merList},
        {path: 'merInfo', name: 'merInfo', component: merInfo},
        {path: 'cashList', name: 'cashList', component: cashList},
        {path: 'codePay', name: 'codePay', component: codePay},
        {path: 'merApp', name: 'merApp', component: merApp},
        //测试
        {path: 'cnt', name: 'cnt', component: cnt},
        //主页
        {path: 'homeDetail', name: 'homeDetail', component: homeDetail},

        //交易管理
        {path: 'billDetail', name: 'billDetail', component: billDetail},
        {path: 'oneBillDetail', name: 'oneBillDetail', component: oneBillDetail},

        //密钥管理
        {path: 'keyManage', name: 'keyManage', component: keyManage},
        {path: 'resetKey', name: 'resetKey', component: resetKey},
        
      ]
    },
    {
      path: '/',
      redirect: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/merAudit',
      name: 'merAudit',
      component: merAudit
    },
    {
      path: '/cnt',
      name: 'cnt',
      component: cnt
    }
  ]
})






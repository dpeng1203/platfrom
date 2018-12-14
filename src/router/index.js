import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'

//商家管理
const merList = resolve => require(['../components/merManagement/merList'], resolve);
const billDetail = resolve => require(['../components/merManagement/billDetail'], resolve);
const oneBillDetail = resolve => require(['../components/merManagement/oneBillDetail'], resolve);
const branchDetail = resolve => require(['../components/merManagement/branchDetail'], resolve);
const merCloseInfo = resolve => require(['../components/merManagement/merCloseInfo'], resolve);
const merInfo = resolve => require(['../components/merManagement/merInfo'], resolve);
const merAudit = resolve => require(['../components/merManagement/merAudit'], resolve);
const cashList = resolve => require(['../components/merManagement/cashList'], resolve);



// 密钥管理
const keyManage = resolve => require(['../components/keyManage/keyManage'], resolve);
const resetKey = resolve => require(['../components/keyManage/resetKey'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      redirect: '/home/branchDetail',
      component: home,
      children:[
        //商家管理
        {path: 'merList', name: 'merList', component: merList},
        {path: 'branchDetail', name: 'branchDetail', component: branchDetail},
        {path: 'billDetail', name: 'billDetail', component: billDetail},
        {path: 'oneBillDetail', name: 'oneBillDetail', component: oneBillDetail},
        {path: 'merCloseInfo', name: 'merCloseInfo', component: merCloseInfo},
        {path: 'merInfo', name: 'merInfo', component: merInfo},
        {path: 'cashList', name: 'cashList', component: cashList},
        
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
    }
  ]
})






import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import routes from '@/router'
import { get } from 'utils/request'
import { getQuery } from 'utils/URLquery'
import './App.css'

function App() {

  useEffect(() => {
    // let token = getQuery('token') || window.localStorage.getItem('token')
    // post('/user/token-login', { token }).then(res => {
    //   window.localStorage.setItem('token', res.data.token)
    //   window.localStorage.setItem('uid', JSON.stringify(res.data.uid))
    // })
    const url = window.decodeURIComponent(window.location.href);
    get(
      `/weixin/ydcj-wx-config?url=${url}`
    ).then(res => {
      console.log(res);
      wx.config({
        debug: false,
        appId: 'wx569951161804e340',
        timestamp: res.data.timestamp,
        nonceStr: res.data.noncestr,
        signature: res.data.signature,
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          'updateAppMessageShareData',
          'updateTimelineShareData',
        ]
      });
      wx.ready(function () {
        wx.updateAppMessageShareData({
          title: '大咖饭局', // 分享标题
          link: `https://h5.fuzhouxiaoyu.com/dakafanju/index.html`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function (res) {
            // 设置成功
            console.log(res);
          },
          cancel: function (res) {
            console.log(res);
          }
        })

        wx.updateTimelineShareData({
          title: '大咖饭局', // 分享标题
          link: `https://h5.fuzhouxiaoyu.com/dakafanju/index.html`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function (res) {
            // 设置成功
            console.log(res);
          },
          cancel: function (res) {
            console.log(res);
          }
        })
      });
    })
  }, [])
  return <Router>
    <Switch>
      {
        routes.map(route => <Route exact key={route.path} path={route.path}>
          <route.component />
        </Route>)
      }
    </Switch>
  </Router>
}

export default App

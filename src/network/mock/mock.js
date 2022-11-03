import Mock from 'mockjs'
import home from './home'
import user from './user'
import permission from './permission'

Mock.mock('http://localhost:8080/home/getData', home.getStatisticalData)
Mock.mock('http://localhost:8080/user/edit','post', user.updateUser)
Mock.mock('http://localhost:8080/user/add','post', user.createUser)
Mock.mock(/user\/getuserlist/, user.getUserList)
Mock.mock(/user\/del/, 'post', user.deleteUser)
Mock.mock(/permission\/getmenu/, 'post', permission.getMenu)
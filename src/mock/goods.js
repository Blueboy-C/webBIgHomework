
import {mock,Random} from "mockjs"

mock("http://localhost:8080/goods","get",{
    "code":20,
     "data|8":[{
         "name":"@cname",
         "price":"@natural(60, 100)",
         "count":"@natural(1,3 )", 
         "img":Random.image('200x100', '#50B347', '#FFF', 'Mock.js')
     }]
})

export default mock
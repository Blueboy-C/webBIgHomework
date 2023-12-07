import {mock} from "mockjs"


mock("http://localhost:3000","get",{
    "code" :20,
    "data|8":[{
        "id":"@id",
        "msg":"@cname",
        "date":"@date",
    }
    ]
})


export default mock
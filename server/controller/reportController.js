const Desposition = require('../model/desposition')
const Customer = require('../model/cutomer')
const User = require('../model/user');

const getCompleteReport = async (req, res) => {
    try {

        const parentId = req?.params?.parentId;
        const slpList =await User.aggregate([
            {$match:{parentId:parentId}},
            {$group:{_id:"$name"}}
        ])
        for (i=0;i<slpList.length;i++){
            const slpName= Object.values(slpList[i])[0]
            const customerName = await Customer.aggregate([
                {$group:{_id:"$name"}}
            ])
            console.log(customerName)
            // const customer = await Customer.aggregate([
            //     {$match:{salesAgent:slpName}},
                
            //     {$count:"customerCount"}
            // ])
            // console.log(customer)
            
            // let leadNum = 0;
            // // console.log(typeof(leadNum))
            // leadNum =  leadNum + parseInt(Object.values(customerDesposition[0]))
            // console.log(leadNum)
            // // for(j=0; j<customerDesposition.length; j++){
            // //     // console.log(typeof(leadNum))
            // // }
            // console.log(customerDesposition.length)
            // console.log(leadNum)

            // {$group:{_id:"$dispositionCount"}},
        }
        const  customerDesposition = await Customer.aggregate([
            {$group:{_id:"$dispositionCount"}}
        ])
        console.log(customerDesposition)
        
        







        res.send(slpList)
        // const parentId = req?.params?.parentId;
        // const user = await User.find({ parentId: parentId })
        // const slpList = [];
        // user.map((user) => { slpList.push(user.name) })

        // let customerLength = [];
        // let totalDesposition = [];
        // for (i = 0; i < slpList.length; i++) {
        //     const slpName = slpList[i]      //console.log(slpName)            
        //     customer = await Customer.find({ salesAgent: slpName })
        //     customerLength.push(customer.length)               //console.log( customerLength) 
        //     const despositionCount = await customer.map(user => user.dispositionCount)
        //     let totalVal = 0;
        //     const totalCount = () => {
        //         for (j = 0; j < despositionCount.length; j++) {
        //             totalVal += despositionCount[j]
        //         }
        //         return totalVal
        //     }
        //     totalDesposition.push(totalCount())
        // }
        // res.status(200).json({ slpList, customerLength, totalDesposition })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getCompleteReport }
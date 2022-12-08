const Desposition = require('../model/desposition')
const Customer = require('../model/cutomer')
const User = require('../model/user');

const getCompleteReport = async (req, res) => {
    try {
        const parentId = req?.params?.parentId;
        const user = await User.find({ parentId: parentId })
        // const slpList= await user
        const slpList = [];
        user.map((user) => { slpList.push(user.name) })
        // const salesAgetn = {...slpList}
        // let customer = []
        // let desposition =[]
        let customerLength = [];
        let totalDesposition = [];
        for (i = 0; i < slpList.length; i++) {
            const slpName = slpList[i]      //console.log(slpName)            
            customer = await Customer.find({ salesAgent: slpName })
            customerLength.push(customer.length)               //console.log( customerLength) 
            
            const despositionCount = await customer.map(user=>user.dispositionCount)
            
            let totalVal= 0;
            const totalCount = ()=>{                
                for (j=0; j<despositionCount.length; j++){
                    totalVal += despositionCount[j]
                }
                return totalVal
            }
            totalDesposition.push(totalCount())
            // const despositionCount =await customer.forEach(element => {
            // element.dispositionCount
            // })
            // const totalDesposition= ()=>{
            //         for (j=0; j<despositionCount.length; j++){
            //             totalVal += despositionCount[j]
            //         }
            //         return totalVal
            //     }
            // console.log(despositionCount)
            // console.log(despositionCount)
            // let totalVal= 0;
            
            //         for (j=0; j<despositionCount.length; j++){
            //             totalVal += despositionCount[j]
            //             console.log(totalVal)
            //         }
            
            
            // totalDesposition.push(
            //     despositionCount.forEach(element => {
            //         return element             }))
            // const totalDesposition= ()=>{
            //     let totalVal= 0;
            //     for (j=0; j<despositionCount.length; j++){
            //         totalVal += despositionCount[j]
            //     }
            //     return totalVal
            // }            
            // const despCount = totalDesposition()    //  console.log(despCount)
        }
        res.status(200).json({ slpList, customerLength, totalDesposition })
        // const desposition = await Desposition.find({...slpList}).count()
        // // console.log(desposition)
        // console.log(slpList)
        // const leadsCount = await customer
        // console.log(leadsCount)

    } catch (error) {
        console.log(error)
    }
}

module.exports = { getCompleteReport }
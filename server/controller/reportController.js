const Desposition = require('../model/desposition')
const Customer = require('../model/cutomer')
const User = require('../model/user');
const Repot_List = require("../config/Report_list")
const getCompleteReport = async (req, res) => {
    try {

        const parentId = parseInt(req?.params?.parentId);
        // console.log(typeof (parentId))
        const slpList = await User.aggregate([
            {
                $match: {
                    $or: [
                        { parentId: parentId },
                        { userId: parentId }
                    ]
                },
                
            },

            { $project: { _id: 0, name: 1, userId: 1 } },

        ])
        console.log(slpList)

        const slpId = slpList.map((x)=>x.userId)
        console.log(slpId) 
        // const userId = 1031
        // const desposition = await User.aggregate([
        //     {
        //         $lookup: {
        //             from: "Desposition",
        //             localField: "userId",
        //             foreignField: "userId",
        //             as: "despostion_details"
        //         }
        //     }
        // ])
        // console.log(desposition)

       
        // const desposition = await slpId.map( async (x)=>{ await Desposition.aggregate([
        //     { $match: { userId: x } },
        //     { $group: { _id: "$desposition", count: { $sum: 1 } } }

        // ])})
        // console.log(desposition)
        const despositionReport = []
        for (i=0;i<slpId.length;i++){
            slpCurrentId = slpId[i];
            const detail = await Desposition.aggregate([
                    { $match: { userId: slpCurrentId } },
                    { $group: { _id: "$desposition", count: { $sum: 1 } } }
        
                ])
            despositionReport.push(detail)
        }



        console.log(despositionReport)
        res.send(despositionReport)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getCompleteReport }
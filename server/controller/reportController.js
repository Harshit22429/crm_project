const Desposition = require('../model/desposition')
const Customer = require('../model/cutomer')
const User = require('../model/user');
const Report_List2 = require("../config/Report_list2")
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

        const slpId = slpList.map((x) => x.userId)
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


        // const desposition =  await Desposition.aggregate([
        //     { $match: { userId: parentId } },
        //     { $group: { _id: "$_id",desposition:{$first:"$desposition"}, count: { $sum: 1 } } }

        // ])
        // console.log(desposition)
        const despositionReport = []
        for (i = 0; i < slpId.length; i++) {
            slpCurrentId = slpId[i];
            const detail = await Desposition.aggregate([
                { $match: { userId: slpCurrentId } },
                { $group: { _id: "$desposition", count: { $sum: 1 } } }
                // {$project : {_id:0,_id:0,desposition:1, count:1}}
            ])
            const singleDetail = Report_List2[detail[i]._id]
            const singleDetailCount = detail[i].count
            console.log(singleDetail, singleDetailCount)
            despositionReport.push({
                despName: singleDetail,
                count: singleDetailCount
            })
            // despositionReport.push(detail)
        }



        console.log(despositionReport)
        res.send(despositionReport)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getCompleteReport }
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
        const slpName = slpList.map((x) => x.name)

        const despositionReport = []
        for (i = 0; i < slpId.length; i++) {
            slpCurrentId = slpId[i];
            slpCurrentName = slpName[i];
            // despositionReport.push({SPName:slpCurrentName})
            const detail = await Desposition.aggregate([
                { $match: { userId: slpCurrentId } },
                { $group: { _id: "$desposition", count: { $sum: 1 } } }
                // {$project : {_id:0,_id:0,desposition:1, count:1}}
            ])

            let slpSeperateDetail = []
            for (j = 0; j < detail.length; j++) {
                singleDetail = Report_List2[detail[j]._id]
                singleDetailCount = detail[j].count
                // console.log(slpCurrentId)
                // console.log(singleDetail, singleDetailCount)
                slpSeperateDetail.push({
                    despositionName: singleDetail,
                    count: singleDetailCount
                })
            }            

            despositionReport.push({
                slpName: slpCurrentName,
                slpDetails: slpSeperateDetail
            })
        }



        // console.log(despositionReport)
        res.json(despositionReport)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getCompleteReport }
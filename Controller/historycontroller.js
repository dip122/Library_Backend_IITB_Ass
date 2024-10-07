const historymodel = require('../Models/history');
class HistoryController {

    static gethistorycontroller = async(req,res)=>{
        try{
            const id = req.params.id;
            const getallhistory = await historymodel.find({userid : id});
            return res.status(200).send({
                success : true,
                message : "All History is received",
                history : getallhistory
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of gethistorycontroller",
                error
            })
        }
    }
}


module.exports = HistoryController;
const historymodel = require('../Models/history');
class HistoryController {

    static gethistorycontrollerforuser = async(req,res)=>{
        try{
            
            const id = req.user._id;
            const getallhistory = await historymodel.find({userid : id}).populate("book");
            return res.status(200).send({
                success : true,
                message : "All History is received",
                history : getallhistory
            });
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of gethistorycontroller",
                error
            })
        }
    }

    static getalluserhistoryborrowedcontroller = async(req,res)=>{
        try{
            const history = await historymodel.find({});
            return res.status(200).send({
                success : true,
                message : "successfully received history",
                history : history
            })
        }catch(error){
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Server side error in case of getalluserhistoryborrowedcontroller",
                error
            })
        }
    }
}


module.exports = HistoryController;
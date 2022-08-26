const User = require("../model/user.model");
const Ticket = require("../model/ticket.model");
const constants = require("../utils/constants")

const isValidOwnerOfTheTicket = async (req, res, next) => {

    const user = await User.findOne({userId : req.userId});

    const ticket = await Ticket.findOne({_id : req.params.id});

    if(user.userType == constants.userTypes.customer){
        const ownerId = ticket.reporter;

        if(user.userId != ownerId){
            return res.status(403).send({
                message : "Only ADMIN | OWNER | ASSIGNED ENGINEER is allowed"
            })
        }
    
    }else if(user.userType == constants.userTypes.engineer){
        const ownerId = ticket.reporter;
        const engineerId = ticket.assignee;

        if(user.userId != ownerId && user.userId != engineerId){
            return res.status(403).send({
                message : "Only ADMIN | OWNER | ASSIGNED ENGINEER is allowed"
            })   
        }
    }

    /** 
     * If the update requires the change in the assignee
     * 
     *  1. Only ADMIN should be allowed to do this change 
     *  2. Assignee should be a valid engineer
     */
    if(req.body.assignee != undefined && user.userType != constants.userTypes.admin){
        return res.status(403).send({
            message : "Only ADMIN is allowed to re-assign a ticket"
        })
    }

    if(req.body.assignee != undefined){

        const engineer = await User.findOne({userId : req.body.assignee});
    
        if(engineer == null){
            return res.status(401).send({
                message : "Engineer userId passed as assignee is wrong"
            });
        }
    }
    next();
}
 
/**
const isValidTicket = async(req, res, next) => {

    if(!req.body.title){
        return res.status(400).send({
            message : "Failed! Title is not Provided !"
        })
    }
    if(!req.body.description){
        return res.status(400).send({
            message : "Failed ! Write description"
        })
    }

    const engineer = await User.findOne({
        userType : constants.userTypes.engineer,
        userStatus : constants.userStatus.approved
    })
    if(!engineer){
        return res.status(401).send({
            message : "Engineer is not Available ! Try some time later"
        })
    }
    next();
}
*/


const verifyTicket = {
    isValidOwnerOfTheTicket : isValidOwnerOfTheTicket,
    // isValidTicket : isValidTicket
} 
module.exports = verifyTicket
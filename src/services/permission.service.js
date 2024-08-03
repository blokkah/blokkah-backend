let grantList = [
    // Customer
    { role: 'Customer', resource: 'user', action: 'update:own', attributes: 'firstName,lastName,email,password,phoneNumber,profilePicture,country,city'},

    // Agent
    { role: 'Agent', resource: 'ads', action: 'create:any', attributes: '*,!views, !userId,!propertyId,!id,!specialAD,!active,!visible,!rejected'},
    { role: 'Agent', resource: 'ads', action: 'update:own', attributes: '*,!views, !userId,!propertyId,!id,!specialAD,!active,!visible,!rejected' }, // if agencyId of agent = current agencyId (commented out)

    // Agency
    { role: 'Agency', resource: 'ads', action: 'create:any', attributes: '*,!views, !userId,!propertyId,!id,!specialAD,!active,!visible,!rejected'},
    //Own here means ad.agentId.agencyId = agencyId OR ad.agentId = agencyId
    { role: 'Agency', resource: 'ads', action: 'update:own', attributes: '*,!views, !userId,!propertyId,!id,!specialAD,!active,!visible,!rejected'},
    //Own here may agents created must have agencyId = currentAgencyId
    //CONDITION:Subscirption allow this
    { role: 'Agency', resource: 'user', action: 'create:own', attributes: 'rejected,isVerified' },
    //Own here means in the AgentAgencyTable there is activated boolean it can only update this
    { role: 'Agency', resource: 'user', action: 'update:own', attributes: 'agencyActivated' },
    //Own Here means its own agents
    { role: 'Agency', resource: 'user', action: 'read:own', attributes: '!password' },
    //Own here means agency ads and agents of the agency ads
    { role: 'Agency', resource: 'ads', action: 'read:own', attributes: '*' },


    // AccountReviewer
    //CONDITION Make sure this role can't update any authority role
    { role: 'AccountActivator', resource: 'user', action: 'update:any', attributes: 'rejected,isVerified' },
    //CONDITION:i can only read users which has state=rejected or activated=false
    { role: 'AccountActivator', resource: 'user', action: 'read:any', attributes: '*,!password' },

    
    // AdReviewer
    //CONDITION:Only Special ads
    { role: 'AdReviewer', resource: 'ads', action: 'update:any', attributes: 'active,rejected' },
    //CONDITION:Only Special ads
    { role: 'AdReviewer', resource: 'ads', action: 'read:any', attributes: '*' },


    // QualityReviewer
    //Can delete update or read any ad (special or not)
    { role: 'QualityReviewer', resource: 'ads', action: 'update:any', attributes: 'rejected,active,visible'},
    { role: 'QualityReviewer', resource: 'ads', action: 'delete:any', attributes: '*'},
    { role: 'QualityReviewer', resource: 'ads', action: 'read:any', attributes: '*' },
    //CONDITION:You must make sure quality reviewer is not banning an authority role!
    { role: 'QualityReviewer', resource: 'user', action: 'update:any', attributes: "banned" },
    { role: 'QualityReviewer', resource: 'Subscription', action: 'read:any', attributes: "*" },
    


    //Account Reviewer

    { role: 'AccountReviewer', resource: 'user', action: 'read:any', attributes: '*,!password' },
    { role: 'AccountReviewer', resource: 'user', action: 'update:any', attributes: 'firstName,lastName,userName,phoneNumber,dateOfBirth,points' },
    { role: 'AccountReviewer', resource: 'Subscription', action: 'create:any', attributes: '*' },
    { role: 'AccountReviewer', resource: 'Subscription', action: 'update:any', attributes: '*' },


     // FinancialAccountant
     //Make sure no any identity information appear in attributes
    { role: 'financialAccountant', resource: 'user', action: 'read:any', attributes: 'points' },
    { role: 'financialAccountant', resource: 'transactions', action: 'read:any', attributes: '*' },


    
    // Support
    { role: 'Support', resource: 'complaints', action: 'read:any', attributes: '*' },
    //Make sure support dosn't update the sender or reciever of the complaint!!!!
    { role: 'Support', resource: 'complaints', action: 'update:any', attributes: '*' },
    

 

    // Marketer
    //Special or Any AD
    { role: 'Marketer', resource: 'ads', action: 'create:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'employees', action: 'read:any', attributes: '*' },
    
    { role: 'SuperAdmin', resource: 'user', action: 'create:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'user', action: 'read:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'user', action: 'update:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'user', action: 'delete:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'ads', action: 'create:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'ads', action: 'read:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'ads', action: 'update:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'ads', action: 'delete:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'Subscription', action: 'create:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'Subscription', action: 'read:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'Subscription', action: 'update:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'Subscription', action: 'delete:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'transactions', action: 'create:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'transactions', action: 'read:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'transactions', action: 'update:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'transactions', action: 'delete:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'complaints', action: 'create:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'complaints', action: 'read:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'complaints', action: 'update:any', attributes: '*' },
    { role: 'SuperAdmin', resource: 'complaints', action: 'delete:any', attributes: '*' }

];
exports.getPermissionMatrix = function () {return grantList};


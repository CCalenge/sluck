exports.chans = "\
    id int(11) NOT NULL AUTO_INCREMENT,\
    name varchar(50) NOT NULL,\
    public tinyint(1) NOT NULL,\
    PRIMARY KEY (id)\
";

exports.chans_members = "\
    chanID int(11) NOT NULL,\
    userID int(11) NOT NULL\
";

exports.chans_messages = "\
    id int(11) NOT NULL AUTO_INCREMENT,\
    chanID INT(11) NOT NULL,\
    userID INT(11) NOT NULL,\
    date bigint(20) NOT NULL ,\
    message longtext NOT NULL,\
    PRIMARY KEY (id)\
";


exports.users = "\
    id int(11) NOT NULL AUTO_INCREMENT,\
    username varchar(50) NOT NULL,\
    password varchar(255) NOT NULL,\
    PRIMARY KEY (id)\
";

exports.users_messages = "\
    id int(11) NOT NULL AUTO_INCREMENT,\
    senderID INT(11) NOT NULL,\
    userID INT(11) NOT NULL,\
    date bigint(20) NOT NULL ,\
    message longtext NOT NULL,\
    PRIMARY KEY (id)\
";

exports.users_starred_chans = "\
    userID INT(11) NOT NULL,\
    chanID INT(11) NOT NULL\
";

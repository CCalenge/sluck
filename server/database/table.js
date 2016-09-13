exports.chans = "\
    id int(11) NOT NULL AUTO_INCREMENT,\
    name varchar(50) NOT NULL,\
    public tinyint(1) NOT NULL,\
    PRIMARY KEY (id)\
";


exports.users = "\
    id int(11) NOT NULL AUTO_INCREMENT,\
    username varchar(50) NOT NULL,\
    password varchar(255) NOT NULL,\
    PRIMARY KEY (id)\
";

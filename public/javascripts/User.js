/**
 * Created by tender_rock on 2017. 4. 28..
 */


var User = {
    records:{},
    prototype:{
        event:{
            update:"updateUser",
            connect:"connectUser",
            disconnect:"disconnectUser"
        },
        init:function(attrs){
            var dataUser = attrs.payload.user;
            dataUser.type = this.type = attrs.payload.type;
            this.id = dataUser.id;
            this.user_name = dataUser.user_name;
            this.display_name = dataUser.display_name;
            this.delta = attrs.delta;
            if(User.find(dataUser.id) == null){
                // this.parent.records[dataUser.id] = $.extend(true, {}, dataUser);
                this.addUserToRecords();
            }

            this.bindEvents();
        },
        addUserToRecords:function(){
            this.parent.records[this.id] = $.extend(true, {}, this);
        },
        destroy: function(){
            delete this.parent.records[this.id];
        },
        update:function(origin, attrs){
            for (var key in attrs){
                origin[key] = attrs[key];
            }
        },
        bindEvents:function(){
            $(document).on("onLoadChat" ,$.proxy(this.fnLoadChat, this));
        },
        fnLoadChat:function(){
            var type = this.type;
            if(type!="message"){
                setTimeout($.proxy(this[this.event[type]], this), this.delta);
            }
        },
        updateUser:function(){
            var user = User.find(this.id);
            var originName = {},
                updateName = {};
            originName.user_name = user.user_name;
            originName.display_name = user.display_name;

            updateName.user_name = this.user_name;
            updateName.display_name = this.display_name;

            User.updateUserInfo(originName.display_name, updateName.display_name);

            console.log(originName.display_name + " convert into " + updateName.display_name);
            this.update(user, updateName);
        },
        connectUser:function(){
            this.addUserToRecords();
            var user = User.find(this.id);
            console.log(user.display_name + " is connected");
            User.makeConnectionInfo(this.display_name, this.type);
        },
        disconnectUser:function(){
            var user = User.find(this.id);
            console.log(user.display_name + " is disconnected");
            User.makeConnectionInfo(this.display_name, this.type);
            this.destroy();
        },
    },
    init: function(){
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance, arguments);
    },
    find:function(id){
        var record = this.records[id];
        if (!record) {
            return null;
        } else{
            return record;
        }
    },
    makeConnectionInfo:function(name, type) {
        var $msgBox = $("<div/>",{
            "class":"msg"
        });

        var $user_id = $("<span/>",{
            "class":"user_id",
            "text" : name
        });

        if (type == "connect") {
            var $connection_info = $("<p/>",{
                "class":"user_info",
                "text" :"is connected."
            });
        }else if(type =="disconnect"){
            var $connection_info = $("<p/>",{
                "class":"user_info",
                "text" :"is disconnected."
            });
        }

        $connection_info.prepend($user_id);
        $msgBox.prepend($connection_info);
        $(".chat_room").append($msgBox);

    },
    updateUserInfo:function(originName, updateName){
        var $msgBox = $("<div/>",{
            "class":"msg notice"
        });

        var $contentRow = $("<p/>",{
            "text": originName +" changed " + updateName
        });

        $msgBox.append($contentRow);
        $(".chat_room").append($msgBox);
    }

};
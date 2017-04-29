/**
 * Created by tender_rock on 2017. 4. 27..
 */


var Message = {
    records:{},
    autoIncrementId:1,
    prototype:{
        event:{
            message:"displayMessage",
            update:"updateMessage",
            delete:"deleteMessage"
        },
        init:function(attrs){
            var dataMsg = attrs.payload.message;
            if(attrs.payload.user) dataMsg.user_id = attrs.payload.user.id;
            dataMsg.delta = this.delta = attrs.delta;
            dataMsg.type  = this.type = attrs.payload.type;
            this.message_id = dataMsg.message_id = dataMsg.id;
            this.id = dataMsg.id = Message.autoIncrementId++;

            this.parent.records[this.id] = $.extend(true, {}, dataMsg);
            this.bindEvents();
        },

        update: function(origin, attrs){
            if(attrs.text){
                origin.text = attrs.text;
            }
        },

        bindEvents:function(){
            $(document).on("onLoadChat", $.proxy(this.fnLoadChat, this));
        },

        fnLoadChat:function(){3
            var type = this.type;
            setTimeout($.proxy(this[this.event[type]], this), this.delta);
        },
        displayMessage:function(){
            var msg = Message.find(this.id);
            var user = User.find(msg.user_id);
            Message.makeMessage(user.display_name, msg.text, this.id);
        },
        updateMessage:function(){
            var msgs = this.findAllByAttrs("message_id", this.message_id);
            var originMsgId = this.findOrigin(msgs);
            var originMsg = Message.find(originMsgId);
            var updatedMsg = Message.find(this.id);

            Message.changeMessage(originMsg, updatedMsg, originMsgId);
            console.log(originMsg.text +" convert into " + updatedMsg.text);
            this.update(originMsg, updatedMsg);
        },
        deleteMessage:function(){
            var msgs = this.findAllByAttrs("message_id", this.message_id);
            var originMsgId = this.findOrigin(msgs);
            Message.disappearMessage(originMsgId);
            Message.destroy(originMsgId);
            console.log("destroy Msg");
        },
        duplicateArr:function(arr){
          return arr.map(function(item){
              return Object.create(item);
          })
        },
        select:function(callback){
            var result=[];
            for(var key in this.parent.records){
                if(callback(this.parent.records[key])){
                    result.push(this.parent.records[key]);
                }
            }
            return this.duplicateArr(result);
        },
        findOrigin:function(arr){
            // var result = {};
            for (var i in arr){
                if(arr[i].type == "message") {
                    return arr[i].id;
                }
            }
        },
        findAllByAttrs: function(attr, value){
            return (this.select(function (item){
                return (item[attr] == value);
            }));
        }



    },
    init:function(){
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance, arguments);
    },
    populate:function(values){
        var user;
        for(var i in values){
            if(values[i].payload.message){
                Message.init(values[i]);
            }
            if((user = values[i].payload.user)){
                if(values[i].payload.type == "message" && User.find(user.id) != null){
                    continue;
                }
                User.init(values[i]);
            }
        }
    },
    find:function(id){
        var record = this.records[id];
        if (!record) {
            // console.log('no record')
            return null;
        } else{
            return record;
        }
    },
    destroy: function(id){
        delete this.records[id];
    },
    triggerSimulate:function(){
        $(document).trigger("onLoadChat");
    },
    makeMessage:function(name, text, id){
        var $idRow = $("<div/>",{
            "class":"user_id",
            "text":name
        });

        var $textRow = $("<p/>",{
            "class":"contents",
            "text":text
        });

        var $msgBox = $("<div/>",{
            "class":"msg",
            "data-msg-id": id
        });

        $msgBox.append($idRow, $textRow);

        $(".chat_room").append($msgBox);
    },
    disappearMessage:function(id){
        var $chat_room = $(".chat_room");
        $chat_room.find("div[data-msg-id="+id+"]").remove();
    },
    changeMessage:function(originMsg, updatedMsg, id){
        //origin msg를 다음 msg로 변경하였습니다
        var $originMsg = $("<p/>",{
            "class":"existed_msg",
            "text": originMsg.text
        });

        var $noticeMsg = $("<span/>",{
            "class":"notice",
            "text" : "changed "
        });

        var $updatedMsg = $("<p/>",{
            "class":"changed_msg",
            "text" :updatedMsg.text
        });

        var $msgBox = $("<div/>",{
            "class":"msg",
            "data-msg-id": id
        });

        $msgBox.append($originMsg, $noticeMsg, $updatedMsg);
        $(".chat_room").append($msgBox);
    }
};


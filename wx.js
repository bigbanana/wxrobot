window.wxEval = {
  init: function(messages){
    var that = this
    this.contactFactory = angular.element(document.body).injector().get('contactFactory')
    this.chatFactory = angular.element(document.body).injector().get('chatFactory')
    this.appFactory = angular.element(document.body).injector().get('appFactory')
    this.msgScope = angular.element('.box_ft').scope()
    this.bodyScope = angular.element(document.body).scope()

    this.bodyScope.$on("newLoginPage", function(){
      console.log('登录成功')
    })
    var _messageProcess = this.chatFactory.messageProcess
    this.chatFactory.messageProcess = function(e){
      _messageProcess.call(this,e)
      try {
        xsend(e);
      } catch(e) { }
    }

    function xsend(e){
      if(!e.MMActualSender) return
      var cont = that.contactFactory.getContact(e.MMActualSender)
      console.log(cont.NickName+': '+e.Content)
      if(!e.sendByLocal){
        messages.forEach(item => {
          if(e.Content.search(item.match) != -1){
            if(!item.nickname || item.nickname == cont.NickName){
              that.chatFactory.setCurrentUserName(e.FromUserName)
              that.msgScope.editAreaCtn = item.reply
              that.msgScope.sendTextMessage()
            }
          }
        });
      }
    }
  }
} 

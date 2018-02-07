window.wxEval = {
  userList:  ["周转","邱应文",'she'],
  init: function(){
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
      if(!e.sendByLocal && that.userList.indexOf(cont.NickName) != -1){
        that.chatFactory.setCurrentUserName(e.FromUserName)
        that.msgScope.editAreaCtn = '<img class="qqemoji qqemoji79" text="[强]_web" src="/zh_CN/htmledition/v2/images/spacer.gif">'
        that.msgScope.sendTextMessage()
      }
    }
  }
} 

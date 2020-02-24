//导入ID3插件
/*document.write("<script language=javascript src='id3-minimized.js'></script>");*/
/*var script = document.createElement("script");

var header = document.getElementsByTagName("head")[0];

header.appendChild(script);

script.src="js/id3-minimized.js";

script.οnlοad=function(){

console.log("ok");

}*/

//音乐盒对象
var musicBox= {
    
    musicDom : null, //播放器对象
    songs : [],      //歌曲目录，用数组来存储
    index : 0,       //当前播放的歌曲索引
    
    //初始化音乐盒
    init : function(){
        this.musicDom = document.createElement('audio');
       // this.musicDom.id = "audio";
        
    },
    
    //添加一首音乐
    add : function(src){
        this.songs.push(src);//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
    },
    
    //根据数组下标决定播放哪一首歌
    choice : function(){
        this.musicDom.src = this.songs[this.index];      
    },

    play : function(){
        this.musicDom.play(); 
        /**
 * 当音频时间正常更新的时候
 */
    musicBox.musicDom.ontimeupdate = function(){
        var currentTime = Math.floor(this.currentTime); //获取当前时间
        var m = parseInt(currentTime / 60);//分钟
        var s = parseInt(currentTime % 60);//秒钟
        var time = (m<10?("0"+m):m)+":"+(s<10?("0"+s):s); //格式化
        document.getElementsByClassName('musictime')[0].innerHTML = time;
        var total = this.duration;//总时长
        /*console.log(currentTime + '=======' + total);
        document.getElementsByClassName('time')[0].innerHTML = Math.floor(currentTime / total * 100) + "%";*/
        document.getElementsByClassName('musicbar')[0].style.width = Math.floor(currentTime / total * 100) + "%";
        /*console.log(time); //打印出来看看*/
        if(this.currentTime == this.duration){
            musicBox.next();
            loadFile(musicBox.songs[musicBox.index]);
            musicBox.choice();
            musicBox.play();
        }
    }
    



    },
    
    //暂停音乐
    stop : function(){
        this.musicDom.pause();
    },
    
    //下一首
    next : function(){
        var len = this.songs.length;
        //判断是否是有效的索引
        if((this.index + 1) >= 0 && this.index < len){
            this.index ++;
            //如果已经是最后一首，就跳到第一首
            if(this.index == len){ 
                this.index = 0;
            }
            //this.play();
        }
        document.getElementsByClassName('musictime')[0].innerHTML = '00:00';
        document.getElementsByClassName('musicbar')[0].style.width = 0;
    },
    
    //上一首
    prev : function(){
        var len = this.songs.length;
        //判断是否是有效的索引
        if((this.index + 1) >= 0 && this.index  < len){
            //如果已经是第一首，就跳到最后一首
            if(this.index == 0){
                this.index = len;
            }
            this.index --;
            //this.play();
        }
        document.getElementsByClassName('musictime')[0].innerHTML = '00:00';
        document.getElementsByClassName('musicbar')[0].style.width = 0;
    },

    /*//获取当前歌曲信息

    getCurrentSong : function(){
    var info = this.songs[this.index];
    info = info.split('/')[1]//split()把一个字符串分割成字符数组
    }   */
}


/**
     * Loading the tags using XHR.
     */
    //filename.mp3 sits on your domain
    ID3.loadTags("filename.mp3", function() {
    var tags = ID3.getAllTags("filename.mp3");
    alert(tags.artist + " - " + tags.title + ", " + tags.album);
});
    /**
     * Loading the tags in the js file.
     */
    function loadFile(url) {
      ID3.loadTags(url, function() {
        showTags(url);
      }
      , {
        tags: ["title","artist","picture"],
      });
    }
/**
     * Generic function to get the tags after they have been loaded.
     */
    function showTags(url) {
      var tags = ID3.getAllTags(url);
      console.log(tags);//在控制台输出标签
      document.getElementById('title').textContent = tags.title || "";
      document.getElementById('artist').textContent = tags.artist || "";
      /*document.getElementById('album').textContent = tags.album || "";*/

      var image = tags.picture;
      if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
                window.btoa(base64String);
        document.getElementById('picture').setAttribute("src",base64);
      } else {
        document.getElementById('picture').style.display = "none";
      }
    }


var slice = document.getElementById("slice");
window.onload=function(){
    musicBox.init(); //初始化
    
    musicBox.add('mp3/Akatsuki no kuruma.m4a');
    musicBox.add('mp3/焔の扉.mp3');
    musicBox.add('mp3/桑島法子 - “机动戦士ガンダムSEED DESTINY”~深海の孤独.mp3');
    musicBox.add('mp3/告白の夜-Ayasa绚沙.mp3');
    musicBox.add('mp3/Meteor‐ミーティア‐.mp3');
    musicBox.add('mp3/INVOKE.mp3');
    loadFile(musicBox.songs[musicBox.index]);
    slice.innerHTML = "-";
}
//musicBox.play(0); 

//获取开始按钮
var playIco=document.getElementById("play");
//获取暂停按钮
var pauseIco = document.getElementById("pause");
//获取上一首按钮
var preIco = document.getElementById("prev");
//获取下一首按钮
var nextIco = document.getElementById("next");
//获取信息栏
/*var title = document.getElementById("title");*/
//获取歌曲封面
/*var pic = document.getElementById("picture");*/
/*var slice = document.getElementById("slice");*/
playIco.onclick=function(){
    this.style.display = 'none';
    pauseIco.style.display = 'inline';
    /*title.innerHTML = " "; */
    /*title.innerHTML = title;*/

   //if(musicBox.musicDom.paused){
   //     musicBox.musicDom.play();
  // }
   // else{
        musicBox.choice();
        /*loadFile(musicBox.songs[musicBox.index]);*/
        /*slice.innerHTML = "-";*/
        
        musicBox.play();
   // }
    
}
pauseIco.onclick=function(){
    this.style.display = 'none';
    playIco.style.display = 'inline';
    musicBox.stop();
}
preIco.onclick=function(){
    musicBox.prev();
    loadFile(musicBox.songs[musicBox.index]);
    /*slice.innerHTML = "-";*/
    /*title.innerHTML = " "; 
    title.innerHTML = title;*/
    if(!musicBox.musicDom.paused){
    musicBox.choice();
    musicBox.play();
}
}
nextIco.onclick=function(){
    musicBox.next();
    loadFile(musicBox.songs[musicBox.index]);
    /*slice.innerHTML = "-";*/
    /*title.innerHTML = " "; 
    title.innerHTML = title;*/
    if(!musicBox.musicDom.paused){
    musicBox.choice();
    musicBox.play();
    }
}
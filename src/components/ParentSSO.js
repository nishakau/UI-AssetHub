import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
class ParentComponent extends Component {
    constructor(props) {
        super(props);
            this.state = { 
                    invalidUrl:'',
                    socialData:'',
                    likesCount:'',
                    likedBy:'',
                    likeId:null,
                    CommentCount:'',
                    likeImg:'../img/like2.png',
                    socialClass:'rightNav rightSection'
                    
            };
        }
    componentDidMount() {
        // sessionStorage.setItem('user_email',"deepika.r@oracle.com");
// alert("test");
        var url = window.location.href;
        //   alert('test');
        var statusGov=url.split('&Governance=');
    //    alert(statusGov[1]);
        if(statusGov[1]=='Y'){
            this.setState({
                // class:'col-md-6 pull-right',
                socialClass:'hide rightNav rightSection'
            });
        }
        var MyAssetStat=url.split('&MyASSET=');
        if(MyAssetStat[1]=='Y'){
            
            this.setState({
                socialClass:'hide rightNav rightSection'
                
            });
        }
        var url = window.location.href;
        var ID=url.split('?');
        global.IDAsset=ID[1];
        var resparam=  {
              assetId:global.IDAsset,
              userId:sessionStorage.getItem('user_email'),
              "user_email":sessionStorage.getItem("user_email")
          }
        axios.post(global.Ip + global.Port + '/asset/socialData/',resparam,{
            headers:resparam
        }) 
        .then(res => {
          var likedBy="";
          var IdforLikeunlike=null;
          var likename;
            for(var i=0;i<=res.data.LIKES.length-1;i++){
                if(res.data.LIKES[i].LIKE_USERNAME==null){
                     likename='-';
                     var firsttwoletterLike = '-';
                }else{
                     likename=res.data.LIKES[i].LIKE_USERNAME;
                     var likeNamesplit=likename.split(" ");
// console.log(likeNamesplit);
                     var firstletterlike = likeNamesplit[0].substring(0,1);
                     if(likeNamesplit[1]!=undefined && likeNamesplit[1]!=null && likeNamesplit[1]!=""){
                        var secondletterlike= likeNamesplit[1].substring(0,1);

                     }else{
                        var secondletterlike= "";

                     }
                     var firsttwoletterLike=firstletterlike + secondletterlike;
                    // var firsttwoletterLike = likename.substring(0,1);
                }           
               likedBy += '<div class="loginname likepane" title='+likename+'><label>'+firsttwoletterLike+'</label></div>' ;
               if(res.data.USER_LIKE.length==1){
                     IdforLikeunlike=res.data.USER_LIKE[0].LIKE_ID;
                    var likeImg='../img/like_orange.png';
                }else{
                    var likeImg='../img/like2.png';             
               }
               this.setState({
                likeImg:likeImg
                
                 });
            }
            var CommentBy="";
            for(var j=0;j<=res.data.COMMENTS.length-1;j++){
                if(res.data.COMMENTS[j].COMMENT_USERNAME!=null && res.data.COMMENTS[j].COMMENT_USERNAME!="" && res.data.COMMENTS[j].COMMENT_USERNAME!=undefined)
                {
                var commentname=(res.data.COMMENTS[j].COMMENT_USERNAME).toUpperCase();
                }else{
                    var commentname="**";
                }
                var desc=res.data.COMMENTS[j].COMMENT_COMMENT;
                var commentNamesplit=commentname.split(" ");

                var firstletter = commentNamesplit[0].substring(0,1);
                if(commentNamesplit[1]!=undefined && commentNamesplit[1]!=null && commentNamesplit[1]!=""){
                    var secondletter= commentNamesplit[1].substring(0,1);

                 }else{
                    var secondletter= "";

                 }



                // var secondletter= commentNamesplit[1].substring(0,1);
                var firsttwoletter=firstletter + secondletter;
                CommentBy += ' <div class="media"><span class="loginname commentBox" title='+commentname+'><label>'+firsttwoletter+'</label></span><div class="media-body"><h6 class="mb-0">'+commentname+' </h6><p>'+desc+'</p> </div></div>' ;
              }
            if(res.data.LIKES.length<1){
                var LikeCount='Be first to like Asset';
            }else{
                var LikeCount= res.data.LIKES.length;
            }
            if(res.data.COMMENTS.length<1){
                var Commentcnt='Be first to Comment on Asset';
            }else{
                var Commentcnt= res.data.COMMENTS.length;
            }
            this.setState({
                socialData:res.data,
                likesCount:LikeCount,
                likedBy:likedBy,
                likeId:IdforLikeunlike,
                CommentCount:Commentcnt,
                CommentBy:CommentBy,
                //likeImg:likeImg
            })
        });
      }
      textAreaAdjust = (e) => {
        var o=document.getElementById('commmentbox');
        // alert("test");
        o.style.height = "1px";
        o.style.height = (25+o.scrollHeight)+"px";
        //console.log(o.style.height);
      }
      handleCommenteMangement = (e) => {
        //   console.log("test");
          
          var comment=document.getElementById('commmentbox').value;
                                if (comment!="" ){
                                var resparam=  {
                                    "assetId":global.IDAsset,
                                    "commentId":null,
                                    "comment":comment,
                                    "commentBy":sessionStorage.getItem('user_email'),
                                    'commentByUserName':sessionStorage.getItem('user_name'),
                                    "user_email":sessionStorage.getItem("user_email")
                                }
                                axios.post(global.Ip + global.Port + '/asset/uploadComment', resparam,{ headers: {
                                    "user_email": sessionStorage.getItem("user_email")             
                        
                                }})
                                .then(res => {
                                document.getElementById('commmentbox').value="";
                                ////////////////////////////////////

                                var resparam=  {
                                    assetId:global.IDAsset,
                                    // "userId":localStorage.getItem('user_email')
                                    userId:sessionStorage.getItem('user_email'),
                                    "user_email":sessionStorage.getItem("user_email")
                                }

                                axios.post(global.Ip + global.Port + '/asset/socialData/',resparam,{
                                    headers:resparam
                                }) 
                                .then(res => {

                                // console.log(res.data);
                                var likedBy="";
                                var IdforLikeunlike=null;
                                var likename;
                                    for(var i=0;i<=res.data.LIKES.length-1;i++){
                                        if(res.data.LIKES[i].LIKE_USERNAME==null){
                                            likename='-';
                                            var firsttwoletterLike = '-';
                                        }else{
                                            likename=res.data.LIKES[i].LIKE_USERNAME;
                                            var likeNamesplit=likename.split(" ");

                                            var firstletterlike = likeNamesplit[0].substring(0,1);
                                            if(likeNamesplit[1]!=undefined && likeNamesplit[1]!=null && likeNamesplit[1]!=""){
                                               var secondletterlike= likeNamesplit[1].substring(0,1);
                       
                                            }else{
                                               var secondletterlike= "";
                       
                                            }
                                            var firsttwoletterLike=firstletterlike + secondletterlike;
                                            // var firsttwoletterLike = likename.substring(0,1);
                                        }

                                    likedBy += '<div class="loginname likepane"  title='+likename+'><label>'+firsttwoletterLike+'</label></div>' ;
                                    if(res.data.USER_LIKE.length==1){
                                        IdforLikeunlike=res.data.USER_LIKE[0].LIKE_ID;
                                       var likeImg='../img/like_orange.png';
                                   }else{
                                       var likeImg='../img/like2.png';             
                                  }
                                  this.setState({likeImg:likeImg});
                                }
                                var CommentBy="";
                                for(var j=0;j<=res.data.COMMENTS.length-1;j++){
                                    if(res.data.COMMENTS[j].COMMENT_USERNAME!="" && res.data.COMMENTS[j].COMMENT_USERNAME!=undefined && res.data.COMMENTS[j].COMMENT_USERNAME!=null)
                                      {
                                        var commentname=(res.data.COMMENTS[j].COMMENT_USERNAME).toUpperCase();
                                      }else{
                                        var commentname='**';
 
                                      }
                                    
                                        var desc=res.data.COMMENTS[j].COMMENT_COMMENT;
                                        var commentNamesplit=commentname.split(" ");

                                        var firstletter = commentNamesplit[0].substring(0,1);
                                        if(commentNamesplit[1]!=undefined && commentNamesplit[1]!=null && commentNamesplit[1]!=""){
                                            var secondletter= commentNamesplit[1].substring(0,1);
                        
                                         }else{
                                            var secondletter= "";
                        
                                         }                                        var firsttwoletter=firstletter + secondletter;
                                        CommentBy += ' <div class="media"><span class="loginname commentBox"  title='+commentname+'><label>'+firsttwoletter+'</label></span><div class="media-body"><h6 class="mb-0">'+commentname+' </h6><p>'+desc+'</p> </div></div>' ;
                                    }
                                if(res.data.LIKES.length<1){
                                    var LikeCount='Be first to like Asset';
                                }else{
                                    var LikeCount= res.data.LIKES.length;

                                }
                                if(res.data.COMMENTS.length<1){
                                    var Commentcnt='Be first to Comment on Asset';
                                }else{
                                    var Commentcnt= res.data.COMMENTS.length;

                                }
                                this.setState({
                                    socialData:res.data,
                                    likesCount:LikeCount,
                                    likedBy:likedBy,
                                    likeId:IdforLikeunlike,
                                    CommentCount:Commentcnt,
                                    CommentBy:CommentBy,
                                   // likeImg:likeImg

                                })


                            });


                        
                        });
                                
                        }else{
                            alert('Please enter Comment first');
                            return false;
                        }

                    }
                handlelikeMangement = (e,LikeId) => {
                var url = window.location.href;
                var ID=url.split('?');
                global.IDAsset=ID[1];
                var resparam=  {
                    "assetId":global.IDAsset,
                    "likeBy":sessionStorage.getItem('user_email'),
                    // "likeId":LikeId,
                    'likeByUserName':sessionStorage.getItem('user_name'),
                    "user_email":sessionStorage.getItem("user_email")

                }
                axios.post(global.Ip + global.Port + '/asset/addToFav', resparam,{ headers: {
                    "user_email": sessionStorage.getItem("user_email")             
        
                }})
                .then(response => {
                // alert(response.data.status);
                ////////////////////////////////////////////////////
                var resparam=  {
                    assetId:global.IDAsset,
                    userId:sessionStorage.getItem('user_email'),
                    "user_email":sessionStorage.getItem("user_email")
                }
  
            axios.post(global.Ip + global.Port + '/asset/socialData/',resparam,{
                headers:resparam
            }).then(res => {
              var likedBy="";
              var IdforLikeunlike=null;
              var likename;
              if(res.data.USER_LIKE.length==1){
                IdforLikeunlike=res.data.USER_LIKE[0].LIKE_ID;
               var likeImg='../img/like_orange.png';
           }else{
               var likeImg='../img/like2.png';             
          }
          this.setState({likeImg:likeImg});
                for(var i=0;i<=res.data.LIKES.length-1;i++){
                    if(res.data.LIKES[i].LIKE_USERNAME==null){
                         likename='-';
                         var firsttwoletterLike = '-';
                    }else{
                         likename=res.data.LIKES[i].LIKE_USERNAME;
                        // var firsttwoletterLike = likename.substring(0,1);


                        var likeNamesplit=likename.split(" ");
                        // var likeNamesplit=likename.split("");

                        var firstletterlike = likeNamesplit[0].substring(0,1);
                        if(likeNamesplit[1]!=undefined && likeNamesplit[1]!=null && likeNamesplit[1]!=""){
                           var secondletterlike= likeNamesplit[1].substring(0,1);
   
                        }else{
                           var secondletterlike= "";
   
                        }
                        var firsttwoletterLike=firstletterlike + secondletterlike;
                    }
                 likedBy += '<span class="loginname likepane " title='+likename+'><label>'+firsttwoletterLike+'</label></span>' ;
                //  alert(res.data.USER_LIKE.length);
                
              }
              var CommentBy="";
              for(var j=0;j<=res.data.COMMENTS.length-1;j++){
                var commentname=(res.data.COMMENTS[j].COMMENT_USERNAME).toUpperCase();
                var desc=res.data.COMMENTS[j].COMMENT_COMMENT;
                var commentNamesplit=commentname.split(" ");

                var firstletter = commentNamesplit[0].substring(0,1);
                if(commentNamesplit[1]!=undefined && commentNamesplit[1]!=null && commentNamesplit[1]!=""){
                    var secondletter= commentNamesplit[1].substring(0,1);

                 }else{
                    var secondletter= "";

                 }                var firsttwoletter=firstletter + secondletter;    
                  CommentBy += ' <div class="media"><span class="loginname commentBox" title='+commentname+'><label>'+firsttwoletter+'</label></span><div class="media-body"><h6 class="mb-0">'+commentname+' </h6><p>'+desc+'</p> </div></div>' ;
                }
                if(res.data.LIKES.length<1){
                  var LikeCount='Be first to like Asset';
              }else{
                  var LikeCount= res.data.LIKES.length;
    
              }
              if(res.data.COMMENTS.length<1){
                  var Commentcnt='Be first to Comment on Asset';
              }else{
                  var Commentcnt= res.data.COMMENTS.length;
    
              }
            this.setState({
                socialData:res.data,
                likesCount:LikeCount,
                likedBy:likedBy,
                likeId:IdforLikeunlike,
                CommentCount:Commentcnt,
                CommentBy:CommentBy,
                //likeImg:likeImg
  
            })
  
  
          });

                    
            });


            }

      
      
        
    render() {
      // alert(this.state.likeImg);
    return (
                        

<Col md={4} className={this.state.socialClass}>
    <div class="likedSection mb-5">
    <div class="statusBar mb-2">
        <img src={this.state.likeImg} alt="like"  id="likeAsset" class="mr-2 rounded-circle" data-value={this.state.likeId} onClick={e => this.handlelikeMangement(e,this.state.likeId)}/>
        <span class="mr-3 titleCnt">{this.state.likesCount}</span>
        <hr />
    </div>
    <div class="wordbreak" dangerouslySetInnerHTML={{ __html: this.state.likedBy}}></div>
    </div>
    <div class="chatBox">
    <div class="statusBar mb-2">
        <img src="../img/message.png" alt="comment" class="mr-2 rounded-circle"/>
        <span class="mr-3 titleCnt">{this.state.CommentCount}</span>
        <hr />
    </div>
    <div class="commentpannel scroll" dangerouslySetInnerHTML={{ __html: this.state.CommentBy}}>
    </div>
    <textarea class="form-control" id="commmentbox" onKeyPress={(ev) => {
          //  console.log(`Pressed keyCode ${ev.key}`);
            this.textAreaAdjust(ev);

            if (ev.key === 'Enter') {
            //selectBox();
            // alert('1');
            this.handleCommenteMangement(ev);
            ev.preventDefault();
            }
        }}  placeholder="write your comment"></textarea>
        <button type="button" class="btn mt-20 pull-right btn-primary" onClick={(ev) => {
           // console.log(`Pressed keyCode ${ev.key}`);
            // if (ev.key === 'Enter') {
            //selectBox();
            // alert('1');
            this.handleCommenteMangement(ev);
            // this.textAreaAdjust(ev);
            ev.preventDefault();
            //}
        }}>Submit</button>

    </div>
</Col>


    );
    }
  }
  
  export default ParentComponent;
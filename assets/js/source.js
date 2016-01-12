
var AboutInfo = React.createClass({

	getInitialState: function(){
        return {
            visible: 'about'		  
};      
    },

    handleClickAbout :function(){
        if (this.state.visible === 'about'){
            this.setState({visible: 'about show'});
        } 
		else {
		this.setState({visible: 'about'});
		}
		  
    },
  render: function() {
    return (
	  <div>
      <div className={this.state.visible}>
       <p> <a href="http://ryancorazza.com">Ryan Corazza</a> created You&apos;re a Gifhead, Charlie Brown with <a href="https://facebook.github.io/react/" target="_blank">React</a> and the <a href="https://api.giphy.com/" target="_blank">Giphy API</a>. It&apos;s best experienced on a large viewport with the audio enabled.</p>
      </div>
	  <button onClick={this.handleClickAbout}>?</button>
	  </div>
    );
  }
});

var GifStage = React.createClass({

	getInitialState: function(){
        return {
            effect: 'gifivision',
		    play: ''		
};			
},      

    handleClickGray :function(){
        if (this.state.effect === 'gifivision' || this.state.effect === 'gifivision blur' || this.state.effect === 'gifivision hue'){
            this.setState({effect: 'gifivision gray'});
        } 
		else {
		this.setState({effect: 'gifivision'});
		}
		  
    },
	
	 handleClickBlur :function(){
        if (this.state.effect === 'gifivision' || this.state.effect === 'gifivision gray' || this.state.effect === 'gifivision hue'){
            this.setState({effect: 'gifivision blur'});
        } 
		else {
		this.setState({effect: 'gifivision'});
		}
		  
    },
	
	 handleClickHue :function(){
        if (this.state.effect === 'gifivision' || this.state.effect === 'gifivision gray' || this.state.effect === 'gifivision blur'){
            this.setState({effect: 'gifivision hue'});
        } 
		else {
		this.setState({effect: 'gifivision'});
		}
		  
    },
	
	
	
	handleClickMusic :function(){
		var player = document.querySelector(".player");
        if (this.state.play === ''){
           this.setState({play: 'on'});
		    player.play();
        } 
		else {
		this.setState({play: ''});
		player.pause();
		}
		  
    }, 
render : function(){
			var divStyle = {
           backgroundImage: 'url(' + this.props.data + ')',
		  
};
			   return (
			   <div>
			   <div style={divStyle} className={this.state.effect}></div>
			    <ul>
					<li onClick={this.handleClickGray}>Gray</li>
					<li onClick={this.handleClickBlur}>Blur</li>
					<li onClick={this.handleClickHue}>Hue</li>
					<li onClick={this.handleClickMusic}>&#9835;</li>
				</ul>
					<audio className="player" loop>
						<source src="assets/audio/monsterrally-panther.ogg" type="audio/ogg" />
						<source src="assets/audio/monsterrally-panther.mp3" type="audio/mpeg" />
					</audio>
			   </div>			
			);
		}

});


var Main = React.createClass({
  loadGiphy: function() {
		 var xhr = new XMLHttpRequest();
    xhr.open('get', this.props.url, true);
    xhr.onload = function(result) {
      var result = JSON.parse(xhr.responseText);
      var randomGif = result.data.image_original_url;
        this.setState({image: randomGif});
    }.bind(this);
    xhr.send();
  },
  getInitialState: function() {
   return {
      image: ''
    };
  },
  componentDidMount: function() {
    this.loadGiphy();
    setInterval(this.loadGiphy, 7000);
  },
  render: function() {
  
    return (
  <div className="miniStage">
	<GifStage data={this.state.image}/>
	<AboutInfo />
 </div>	
    );
  }
});

ReactDOM.render(
  <Main url="http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=charlie+brown" />,
  document.getElementById('stage')
);




class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 1500,
            sessionSec: 25,
            breakSec: 5,
            isSession: true,
            paused: true
        };
        this.timer = 0;
        this.startPauseTimer = this.startPauseTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.changeTimer = this.changeTimer.bind(this)
        this.countDown = this.countDown.bind(this);
        this.brkInc = this.brkInc.bind(this);
        this.brkDec = this.brkDec.bind(this);
        this.sesInc = this.sesInc.bind(this);
        this.sesDec = this.sesDec.bind(this);
        this.displayTime = this.displayTime.bind(this);
    };
    startPauseTimer() {
      if (!this.state.paused) {
        clearInterval(this.timer);
        this.setState({paused: !this.state.paused});
      }
      else if (this.state.paused) {
        this.setState({paused: !this.state.paused});
        this.timer = setInterval(this.countDown, 1000);
      };
    };
    resetTimer() {
      clearInterval(this.timer);
      this.setState({
        sessionSec: 25,
        breakSec: 5,
        seconds: 1500,
        isSession: true,
        paused: true
      });
      this.audio.pause();
      this.audio.currentTime = 0;
    };
    changeTimer() {
      this.setState({isSession: !this.state.isSession});
      if (this.state.isSession) {
        this.setState({seconds: this.state.sessionSec * 60});
        this.timer = setInterval(this.countDown, 1000);
      }
      else {
        this.setState({seconds: this.state.breakSec * 60})
        this.timer = setInterval(this.countDown, 1000);
      };
    };
    countDown() {
      let secs = this.state.seconds - 1;
      this.setState({
        seconds: secs,
      });
        
      if (secs == 0) { 
        clearInterval(this.timer);
        this.audio.play();
        this.audio.currentTime = 0;
        setTimeout(() => this.changeTimer(), 1000);
      };
    };
    brkInc() {
      if(this.state.paused && this.state.breakSec < 60) {
        this.setState({breakSec: this.state.breakSec + 1});
        if (!this.state.isSession) {
          this.setState({seconds: this.state.breakSec * 60 + 60});
        };
      };      
    };
    brkDec() {
      if(this.state.paused && this.state.breakSec > 1) {
        this.setState({breakSec: this.state.breakSec - 1});
        if (!this.state.isSession) {
          this.setState({seconds: this.state.breakSec * 60 - 60});
        };        
      };
    };
    sesInc() {
      if(this.state.paused && this.state.sessionSec < 60) {
        this.setState({sessionSec: this.state.sessionSec + 1});
        if (this.state.isSession) {
          this.setState({seconds: this.state.sessionSec * 60 + 60});
        };
      };
    };
    sesDec() {
      if(this.state.paused && this.state.sessionSec > 1) {
        this.setState({sessionSec: this.state.sessionSec - 1});
        if (this.state.isSession) {
          this.setState({seconds: this.state.sessionSec * 60 - 60});
        };
      };  
    };
    displayTime() {
      let min = Math.floor(this.state.seconds / 60);
      let sec = this.state.seconds - min * 60;
      sec = sec < 10 ? '0' + sec : sec;
      min = min < 10 ? '0' + min : min;
      return min + ':' + sec;
    };
    render() {
        return(
          <div id='wrapper'>
            <h1>25 + 5 Clock</h1>
            <div id='timer-length'>
              <div className='box' id='session-box'>
                <h2 className='label' id='session-label'>Session Length</h2>
                <div className='btns'>
                  <i  id='session-decrement' className="fa fa-arrow-down fa-2x" onClick={this.sesDec} />
                  <h3 id='session-length'>{this.state.sessionSec}</h3>
                  <i  id='session-increment' className="fa fa-arrow-up fa-2x" onClick={this.sesInc} />
                </div>
              </div>
              <div className='box' id='break-box'>
                <h2 className='label' id='break-label'>Break Length</h2>
                <div className='btns'>
                  <i  id='break-decrement' className="fa fa-arrow-down fa-2x" onClick={this.brkDec} />
                  <h3 id='break-length'>{this.state.breakSec}</h3>
                  <i  id='break-increment' className="fa fa-arrow-up fa-2x" onClick={this.brkInc} />
                </div>
              </div>
            </div>
            <div className='box' id='display'>
              <h1 className='label' id='timer-label'>{(this.state.isSession) ? 'Session' : 'Break'}</h1>
              <h2 style={(this.state.seconds<60)?{color:'red'}:{color:'white'}} id='time-left'>{this.displayTime()}</h2>
              <div className='btns'>
                <i  id='start_stop' className={(this.state.paused)?'fa fa-play fa-2x':'fa fa-pause fa-2x'} onClick={this.startPauseTimer} />
                <i  id='reset' className="fa fa-refresh fa-2x" onClick={this.resetTimer} />
              </div>
            </div>
            <audio 
              id='beep' 
              preload='auto' 
              ref={e => this.audio = e}
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
          </div>
        );
    };
};

ReactDOM.render(<App />, document.getElementById('app'));